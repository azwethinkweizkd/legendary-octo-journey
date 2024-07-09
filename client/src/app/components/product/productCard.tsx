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
import { LoadingButton } from "@mui/lab";

import { currencyFormat } from "../../util/util";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { addBasketItemAsync } from "../../routes/basket/basketSlice";

interface Props {
	product: Product;
}

export const ProductCard = ({ product }: Props) => {
	const dispatch = useAppDispatch();
	const { status } = useAppSelector((state) => state.basket);

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
					loading={status === "pendingAddItem" + product.id}
					onClick={() =>
						dispatch(addBasketItemAsync({ productId: product.id }))
					}
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
