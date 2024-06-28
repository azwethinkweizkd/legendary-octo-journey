import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../app/layout/App";
import { Home } from "./home/homePage";
import { Catalog } from "./catalog/catalog";
import { ProductDetails } from "./product/productPage";
import { About } from "./about/aboutPage";
import { Contact } from "./contact/contactPage";
import { ServerError } from "../app/errors/serverError";
import { NotFound } from "../app/errors/notFound";

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
			{
				path: "server-error",
				element: <ServerError />,
			},
			{
				path: "not-found",
				element: <NotFound />,
			},
			{
				path: "*",
				element: <Navigate replace to="/not-found" />,
			},
		],
	},
]);
