import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Divider,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { Spinner } from "../../components/loading/spinner";
import { currencyFormat } from "../../util/util";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import {
	addBasketItemAsync,
	removeBasketItemAsync,
} from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "../catalog/catalogSlice";
import { NotFound } from "../../errors/notFound";

export const ProductDetails = () => {
	const { id } = useParams<{ id: string }>();
	const { basket, status } = useAppSelector((state) => state.basket);
	const { status: productStatus } = useAppSelector((state) => state.catalog);
	const dispatch = useAppDispatch();
	const product = useAppSelector((state) =>
		productSelectors.selectById(state, parseInt(id!))
	);
	const [quantity, setQuantity] = useState(0);
	const item = basket?.items.find((i) => i.productId === product?.id);

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		if (parseInt(event.currentTarget.value) >= 0)
			setQuantity(parseInt(event.currentTarget.value));
	}

	function handleUpdateCart() {
		if (!product) return;

		if (!item || quantity > item?.quantity) {
			const updatedQuantity = item ? quantity - item.quantity : quantity;
			dispatch(
				addBasketItemAsync({ productId: product.id, quantity: updatedQuantity })
			);
		} else {
			const updatedQuantity = item.quantity - quantity;
			dispatch(
				removeBasketItemAsync({
					productId: product.id,
					quantity: updatedQuantity,
				})
			);
		}
	}

	useEffect(() => {
		if (item) setQuantity(item.quantity);
		if (!product && id) dispatch(fetchProductAsync(parseInt(id)));
	}, [id, item, product, dispatch]);

	if (productStatus === "pending")
		return <Spinner message="Loading Product..." />;
	if (!product) return <NotFound />;

	return (
		<Grid container spacing={6} paddingTop={16}>
			<Grid item xs={6}>
				<img
					src={product.pictureId}
					alt={product.name}
					style={{
						width: "100%",
						backgroundColor: "whitesmoke",
						borderRadius: "25%",
						display: "block",
						marginLeft: "auto",
						marginRight: "auto",
					}}
				/>
			</Grid>
			<Grid item xs={6}>
				<Typography variant="h3">{product.name}</Typography>
				<Divider sx={{ mb: 2 }} />
				<Typography variant="h4" color="secondary">
					{currencyFormat(product.price)}
				</Typography>
				<TableContainer>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>{product.name}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Description</TableCell>
								<TableCell>{product.description}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Type</TableCell>
								<TableCell>{product.type}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Quantity in stock</TableCell>
								<TableCell>{product.qntyInStock}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<Grid container spacing={2} marginY={2}>
					<Grid item xs={6}>
						<TextField
							color="secondary"
							onChange={handleInputChange}
							variant="outlined"
							type="number"
							label="Quantity in cart"
							fullWidth
							value={quantity}
						/>
					</Grid>
					<Grid item xs={6}>
						<LoadingButton
							disabled={
								item?.quantity === quantity || (quantity === 0 && !item)
							}
							loading={status === "pending"}
							onClick={handleUpdateCart}
							sx={{ height: "55px" }}
							color="primary"
							size="large"
							variant="contained"
							fullWidth>
							{item ? "Update Quantity" : "Add to Cart"}
						</LoadingButton>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
