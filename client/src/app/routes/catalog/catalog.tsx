import { useEffect } from "react";
import { Product } from "../../models/types";
import { ProductList } from "../../components/product/productList";

import { Spinner } from "../../components/loading/spinner";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

export interface ProductArrProps {
	products: Product[];
}

export const Catalog = () => {
	const products = useAppSelector(productSelectors.selectAll);
	const { productsLoaded, status } = useAppSelector((state) => state.catalog);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (!productsLoaded) dispatch(fetchProductsAsync());
	}, [dispatch, productsLoaded]);

	if (status === "pending") return <Spinner message="Loading products..." />;

	return <ProductList products={products} />;
};
