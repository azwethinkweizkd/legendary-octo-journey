import { useState, useEffect } from "react";
import { Product } from "../models/types";

function App() {
	const [products, setProducts] = useState<Product[]>([]);
	useEffect(() => {
		fetch("http://localhost:5000/api/products")
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);

	return (
		<div>
			<h1>Re-Store</h1>
			<ul>
				{products.map((product) => (
					<li key={product.id}>
						{product.name} - ${product.price}
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
