import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../models/types";
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
import agent from "../../api/agent";
import { Spinner } from "../../components/loading/spinner";
import { currencyFormat } from "../../util/util";
import { useStoreContext } from "../../context/useStoreContext";
import { LoadingButton } from "@mui/lab";

export const ProductDetails = () => {
	const { basket, setBasket, removeItem } = useStoreContext();
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [quantity, setQuantity] = useState(0);
	const [submitting, setSubmitting] = useState(false);
	const item = basket?.items.find((i) => i.productId === product?.id);

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		if (parseInt(event.currentTarget.value) >= 0)
			setQuantity(parseInt(event.currentTarget.value));
	}

	function handleUpdateCart() {
		if (!product) return;
		setSubmitting(true);
		if (!item || quantity > item.quantity) {
			const updatedQuantity = item ? quantity - item.quantity : quantity;
			agent.Basket.addItem(product?.id, updatedQuantity)
				.then((basket) => setBasket(basket))
				.catch((err) => console.error(err))
				.finally(() => setSubmitting(false));
		} else {
			const updatedQuantity = item.quantity - quantity;
			agent.Basket.removeItem(product?.id, updatedQuantity)
				.then(() => removeItem(product?.id, updatedQuantity))
				.catch((err) => console.error(err))
				.finally(() => setSubmitting(false));
		}
	}

	useEffect(() => {
		if (item) setQuantity(item.quantity);
		id &&
			agent.Catalog.details(parseInt(id))
				.then((res) => setProduct(res))
				.catch((err) => console.error(err.response))
				.finally(() => setLoading(false));
	}, [id, item]);

	if (loading) return <Spinner message="Loading Product..." />;
	if (!product)
		return <h3 style={{ paddingTop: "64px" }}>Product not found</h3>;

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
							loading={submitting}
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
