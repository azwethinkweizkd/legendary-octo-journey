import { useState, useEffect } from "react";
import { Product } from "../../models/types";
import { ProductList } from "../../components/product/productList";
import agent from "../../api/agent";
import { Spinner } from "../../components/loading/spinner";

export interface ProductArrProps {
	products: Product[];
}

export const Catalog = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		agent.Catalog.list()
			.then((products) => setProducts(products))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <Spinner message="Loading products..." />;

	return <ProductList products={products} />;
};
