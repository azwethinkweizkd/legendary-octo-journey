import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { Basket } from "../../app/models/types";
import { Spinner } from "../../components/loading/spinner";
import { Typography } from "@mui/material";

export const BasketPage = () => {
	const [loading, setLoading] = useState(true);
	const [basket, setBasket] = useState<Basket | null>(null);

	useEffect(() => {
		agent.Basket.get()
			.then((b: Basket) => setBasket(b))
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}, []);
	if (loading) return <Spinner message="Loading basket..." />;

	if (!basket)
		return <Typography variant="h3">Your basket is empty</Typography>;

	return <h1 style={{ marginTop: "96px" }}>Basket Id = {basket.buyerId}</h1>;
};
