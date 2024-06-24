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

interface Props {
	product: Product;
}

export const ProductCard = ({ product }: Props) => {
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
				<Button size="small">Add to cart</Button>
				<Button component={Link} to={`/catalog/${product.id}`} size="small">
					Learn more!
				</Button>
			</CardActions>
		</Card>
	);
};
