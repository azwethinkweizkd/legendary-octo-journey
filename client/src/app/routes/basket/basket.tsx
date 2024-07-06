import {
	Box,
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

export const BasketPage = () => {
	const { basket, setBasket, removeItem } = useStoreContext();
	const [loading, setLoading] = useState(false);

	function handleAddItem(productId: number) {
		setLoading(true);
		agent.Basket.addItem(productId)
			.then((basket) => setBasket(basket))
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}

	function handleRemoveItem(productId: number, quantity = 1) {
		setLoading(true);

		agent.Basket.removeItem(productId, quantity)
			.then(() => removeItem(productId, quantity))
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}

	if (!basket)
		return (
			<Typography variant="h3" marginTop={16}>
				Your basket is empty
			</Typography>
		);

	return (
		<TableContainer component={Paper} sx={{ marginTop: "96px" }}>
			<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
							<TableCell align="right">
								${(item.price / 100).toFixed(2)}
							</TableCell>
							<TableCell align="center">
								<LoadingButton
									loading={loading}
									color="error"
									onClick={() => handleRemoveItem(item.productId)}>
									<Remove />
								</LoadingButton>
								{item.quantity}
								<LoadingButton
									loading={loading}
									color="success"
									onClick={() => handleAddItem(item.productId)}>
									<Add />
								</LoadingButton>
							</TableCell>
							<TableCell align="right">
								{((item.price * item.quantity) / 100).toFixed(2)}
							</TableCell>
							<TableCell align="right">
								<LoadingButton
									loading={loading}
									color="error"
									onClick={() =>
										handleRemoveItem(item.productId, item.quantity)
									}>
									<Delete />
								</LoadingButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
