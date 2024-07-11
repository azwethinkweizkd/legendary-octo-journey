import { Grid } from "@mui/material";
import { ProductArrProps } from "../../routes/catalog/catalog";
import { ProductCard } from "./productCard";
import { useAppSelector } from "../../store/configureStore";
import ProductCardSkeleton from "../skeltons/productCardSkeleton";

export const ProductList = ({ products }: ProductArrProps) => {
	const { productsLoaded } = useAppSelector((state) => state.catalog);
	return (
		<Grid container spacing={4}>
			{products.map((product) => (
				<Grid item xs={4} key={product.id}>
					{!productsLoaded ? (
						<ProductCardSkeleton />
					) : (
						<ProductCard key={product.id} product={product} />
					)}
				</Grid>
			))}
		</Grid>
	);
};
