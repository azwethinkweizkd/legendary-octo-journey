import {
	CardMedia,
	Card,
	CardContent,
	Typography,
	CardHeader,
	Avatar,
	CardActions,
	Button,
} from "@mui/material";
import { Product } from "../../models/types";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../context/useStoreContext";
import { currencyFormat } from "../../util/util";

interface Props {
	product: Product;
}

export const ProductCard = ({ product }: Props) => {
	const [loading, setLoading] = useState(false);
	const { setBasket } = useStoreContext();

	function handleAddItem(productId: number, quantity: number = 1) {
		setLoading(true);
		agent.Basket.addItem(productId, quantity)
			.then((basket) => setBasket(basket))
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}

	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: "secondary.main" }}>
						{product.name.charAt(0).toUpperCase()}
					</Avatar>
				}
				title={product.name}
				titleTypographyProps={{
					sx: { fontWeight: "bold", color: "primary.light" },
				}}
			/>

			<CardMedia
				sx={{
					height: 140,
					backgroundSize: "contain",
					bgcolor: "#bfc1c2",
				}}
				image={product.pictureId}
				title={product.name}
			/>
			<CardContent>
				<Typography gutterBottom color="secondary" variant="h5" component="div">
					{currencyFormat(product.price)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{product.brand} / {product.type}
				</Typography>
			</CardContent>
			<CardActions>
				<LoadingButton
					loading={loading}
					onClick={() => handleAddItem(product.id)}
					size="small">
					Add to cart
				</LoadingButton>
				<Button component={Link} to={`/catalog/${product.id}`} size="small">
					Learn more!
				</Button>
			</CardActions>
		</Card>
	);
};
