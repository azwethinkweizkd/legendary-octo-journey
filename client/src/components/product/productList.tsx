import { Grid } from "@mui/material";
import { ProductArrProps } from "../../routes/catalog/catalog";
import { ProductCard } from "./productCard";

export const ProductList = ({ products }: ProductArrProps) => {
	return (
		<Grid container spacing={4} marginTop={6} marginBottom={4}>
			{products.map((product) => (
				<Grid item xs={3} key={product.id}>
					<ProductCard key={product.id} product={product} />
				</Grid>
			))}
		</Grid>
	);
};
