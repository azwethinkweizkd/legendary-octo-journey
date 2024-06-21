import { Grid } from "@mui/material";
import { Props } from "./catalog";
import { ProductCard } from "./productCard";

export const ProductList = ({ products }: Props) => {
	return (
		<Grid container spacing={4} marginTop={6}>
			{products.map((product) => (
				<Grid item xs={3} key={product.id}>
					<ProductCard key={product.id} product={product} />
				</Grid>
			))}
		</Grid>
	);
};
