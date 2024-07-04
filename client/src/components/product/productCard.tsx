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
import { Product } from "../../app/models/types";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

interface Props {
	product: Product;
}

export const ProductCard = ({ product }: Props) => {
	const [loading, setLoading] = useState(false);

	function handleAddItem(productId: number, quantity: number = 1) {
		setLoading(true);
		agent.Basket.addItem(productId, quantity)
			.catch((err) => console.log(err))
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
					${(product.price / 100).toFixed(2)}
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
