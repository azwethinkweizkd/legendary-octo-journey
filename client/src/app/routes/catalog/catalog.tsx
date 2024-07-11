import { useEffect } from "react";
import { Product } from "../../models/types";
import { ProductList } from "../../components/product/productList";
import { Spinner } from "../../components/loading/spinner";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import {
	fetchFilters,
	fetchProductsAsync,
	productSelectors,
	setProductParams,
} from "./catalogSlice";
import { Grid, Paper } from "@mui/material";
import { ProductSearch } from "./productSearch";
import RadioButtonGroup from "../../components/radioBtnGroup/radioBtnGroup";
import CheckboxButtons from "../../components/checkboxes/checkboxButtons";
import AppPagination from "../../components/appPagination/appPagination";
export interface ProductArrProps {
	products: Product[];
}

const sortOptions = [
	{ value: "name", label: "Alphabetical" },
	{ value: "priceDesc", label: "Price - High to low" },
	{ value: "price", label: "Price - Low to High" },
];

export const Catalog = () => {
	const products = useAppSelector(productSelectors.selectAll);
	const {
		productsLoaded,
		status,
		filtersLoaded,
		brands,
		types,
		productParams,
		metaData,
	} = useAppSelector((state) => state.catalog);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!productsLoaded) dispatch(fetchProductsAsync());
	}, [dispatch, productsLoaded]);

	useEffect(() => {
		if (!filtersLoaded) dispatch(fetchFilters());
	}, [dispatch, filtersLoaded]);

	if (status === "pending" || !metaData)
		return <Spinner message="Loading products..." />;

	return (
		<Grid container spacing={4} marginTop={6}>
			<Grid item xs={3}>
				<Paper sx={{ mb: 2 }}>
					<ProductSearch />
				</Paper>
				<Paper sx={{ mb: 2, p: 2 }}>
					<RadioButtonGroup
						selectedValue={productParams.orderBy}
						options={sortOptions}
						onChange={(e) =>
							dispatch(setProductParams({ orderBy: e.target.value }))
						}
					/>
				</Paper>
				<Paper sx={{ mb: 2, p: 2 }}>
					<CheckboxButtons
						items={brands}
						checked={productParams.brands}
						onChange={(items: string[]) =>
							dispatch(setProductParams({ brands: items }))
						}
					/>
				</Paper>

				<Paper sx={{ mb: 2, p: 2 }}>
					<CheckboxButtons
						items={types}
						checked={productParams.types}
						onChange={(items: string[]) =>
							dispatch(setProductParams({ types: items }))
						}
					/>
				</Paper>
			</Grid>
			<Grid item xs={9}>
				<ProductList products={products} />
			</Grid>
			<Grid item xs={3}></Grid>
			<Grid item xs={9}>
				<AppPagination
					metaData={metaData}
					onPageChange={(page: number) =>
						dispatch(setProductParams({ pageNumber: page }))
					}
				/>
			</Grid>
		</Grid>
	);
};
