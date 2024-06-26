import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/types";
import {
	Divider,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from "@mui/material";
import agent from "../../app/api/agent";
import { Spinner } from "../../components/loading/spinner";

export const ProductDetails = () => {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		id &&
			agent.Catalog.details(parseInt(id))
				.then((res) => setProduct(res))
				.catch((err) => console.log(err.response))
				.finally(() => setLoading(false));
	}, [id]);

	if (loading) return <Spinner message="Loading Product..." />;
	if (!product)
		return <h3 style={{ paddingTop: "64px" }}>Product not found</h3>;

	return (
		<Grid container spacing={6} paddingTop={16}>
			<Grid item xs={6}>
				<img
					src={product.pictureId}
					alt={product.name}
					style={{ width: "100%" }}
				/>
			</Grid>
			<Grid item xs={6}>
				<Typography variant="h3">{product.name}</Typography>
				<Divider sx={{ mb: 2 }} />
				<Typography variant="h4" color="secondary">
					${(product.price / 100).toFixed(2)}
				</Typography>
				<TableContainer>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>{product.name}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Description</TableCell>
								<TableCell>{product.description}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Type</TableCell>
								<TableCell>{product.type}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Quantity in stock</TableCell>
								<TableCell>{product.qntyInStock}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</Grid>
	);
};
