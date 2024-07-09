import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../util/util";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

const TAX_RATE = 0.1;

export const BasketPage = () => {
	const { basket, status } = useAppSelector((state) => state.basket);
	const dispatch = useAppDispatch();

	if (!basket?.items.length || !basket)
		return (
			<Typography variant="h3" marginTop={16}>
				Your basket is empty
			</Typography>
		);

	return (
		<TableContainer component={Paper} sx={{ marginTop: "96px" }}>
			<Table sx={{ minWidth: 700 }} aria-label="spanning table">
				<TableHead>
					<TableRow>
						<TableCell>Product</TableCell>
						<TableCell align="right">Price</TableCell>
						<TableCell align="center">Quantity</TableCell>
						<TableCell align="right">Subtotal</TableCell>
						<TableCell align="right"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{basket.items.map((item) => (
						<TableRow
							key={item.productId}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
							<TableCell component="th" scope="row">
								<Box display="flex" alignItems="center">
									<img
										src={item.pictureId}
										alt={item.name}
										style={{ height: 50, marginRight: 20 }}
									/>
									<span>{item.name}</span>
								</Box>
							</TableCell>
							<TableCell align="right">{currencyFormat(item.price)}</TableCell>
							<TableCell align="center">
								<LoadingButton
									loading={
										status === "pendingRemoveItem" + item.productId + "rem"
									}
									color="error"
									onClick={() =>
										dispatch(
											removeBasketItemAsync({
												productId: item.productId,
												quantity: 1,
												name: "rem",
											})
										)
									}>
									<Remove />
								</LoadingButton>
								{item.quantity}
								<LoadingButton
									loading={status === "pendingAddItem" + item.productId}
									color="success"
									onClick={() =>
										dispatch(addBasketItemAsync({ productId: item.productId }))
									}>
									<Add />
								</LoadingButton>
							</TableCell>
							<TableCell align="right">
								{currencyFormat(item.price * item.quantity)}
							</TableCell>
							<TableCell align="right">
								<LoadingButton
									loading={
										status === "pendingRemoveItem" + item.productId + "del"
									}
									color="error"
									onClick={() =>
										dispatch(
											removeBasketItemAsync({
												productId: item.productId,
												quantity: item.quantity,
												name: "del",
											})
										)
									}>
									<Delete />
								</LoadingButton>
							</TableCell>
						</TableRow>
					))}
					<>
						<TableRow>
							<TableCell rowSpan={5} />
							<TableCell colSpan={2}>Subtotal</TableCell>
							<TableCell align="right">
								{currencyFormat(basket.subtotal)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Tax</TableCell>
							<TableCell align="right">
								{`${(TAX_RATE * 100).toFixed(0)} %`}
							</TableCell>
							<TableCell align="right">{currencyFormat(basket.tax)}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>Delivery fee</TableCell>
							<TableCell align="right">
								{currencyFormat(basket.deliveryFee)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>Total</TableCell>
							<TableCell align="right">
								{currencyFormat(basket.total)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2} />
							<TableCell align="right">
								<Button
									component={Link}
									to="/checkout"
									variant="contained"
									size="large"
									fullWidth>
									Checkout
								</Button>
							</TableCell>
						</TableRow>
					</>
				</TableBody>
			</Table>
		</TableContainer>
	);
};
