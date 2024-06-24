import { createBrowserRouter } from "react-router-dom";

import App from "../app/layout/App";
import { Home } from "./home/homePage";
import { Catalog } from "./catalog/catalog";
import { ProductDetails } from "./product/productPage";
import { About } from "./about/aboutPage";
import { Contact } from "./contact/contactPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				path: "catalog",
				element: <Catalog />,
			},
			{
				path: "catalog/:id",
				element: <ProductDetails />,
			},
			{
				path: "about",
				element: <About />,
			},
			{
				path: "contact",
				element: <Contact />,
			},
		],
	},
]);
