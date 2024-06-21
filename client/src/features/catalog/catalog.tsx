import { useState, useEffect } from "react";
import { Product } from "../../app/models/types";
import { ProductList } from "./productList";

export interface Props {
	products: Product[];
}

export const Catalog = () => {
	const [products, setProducts] = useState<Product[]>([]);
	useEffect(() => {
		fetch("http://localhost:5000/api/products")
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);

	return <ProductList products={products} />;
};
