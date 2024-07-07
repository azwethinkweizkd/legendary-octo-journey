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
import { useStoreContext } from "../../context/useStoreContext";
import agent from "../../api/agent";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../util/util";
import { Link } from "react-router-dom";

const TAX_RATE = 0.1;

export const BasketPage = () => {
	const { basket, setBasket, removeItem } = useStoreContext();
	const [status, setStatus] = useState({
		loading: false,
		name: "",
	});

	function handleAddItem(productId: number, name: string) {
		setStatus({ loading: true, name });
		agent.Basket.addItem(productId)
			.then((basket) => setBasket(basket))
			.catch((err) => console.error(err))
			.finally(() => setStatus({ loading: false, name: "" }));
	}

	function handleRemoveItem(productId: number, name: string, quantity = 1) {
		setStatus({ loading: true, name });
		agent.Basket.removeItem(productId, quantity)
			.then((basket) => {
				removeItem(productId, quantity);
				setBasket(basket);
			})
			.catch((err) => console.error(err))
			.finally(() => setStatus({ loading: true, name: "" }));
	}

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
										status.loading && status.name === "rem" + item.productId
									}
									color="error"
									onClick={() =>
										handleRemoveItem(item.productId, "rem" + item.productId)
									}>
									<Remove />
								</LoadingButton>
								{item.quantity}
								<LoadingButton
									loading={
										status.loading && status.name === "add" + item.productId
									}
									color="success"
									onClick={() =>
										handleAddItem(item.productId, "add" + item.productId)
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
										status.loading && status.name === "del" + item.productId
									}
									color="error"
									onClick={() =>
										handleRemoveItem(
											item.productId,
											"del" + item.productId,
											item.quantity
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
