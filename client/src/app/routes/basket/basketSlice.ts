/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../models/types";
import agent from "../../api/agent";

interface BasketState {
	basket: Basket | null;
	status: string;
}

const initialState: BasketState = {
	basket: null,
	status: "idle",
};

export const addBasketItemAsync = createAsyncThunk<
	Basket,
	{ productId: number; quantity?: number }
>(
	"basket/addItemBasketItemAsync",
	async ({ productId, quantity = 1 }, thunkAPI) => {
		try {
			return await agent.Basket.addItem(productId, quantity);
		} catch (error: any) {
			return thunkAPI.rejectWithValue({ error: error.data });
		}
	}
);

export const removeBasketItemAsync = createAsyncThunk<
	Basket,
	{ productId: number; quantity?: number; name?: string }
>(
	"basket/removeBasketItemAsync",
	async ({ productId, quantity = 1 }, thunkAPI) => {
		try {
			return await agent.Basket.removeItem(productId, quantity);
		} catch (error: any) {
			return thunkAPI.rejectWithValue({ error: error.data });
		}
	}
);

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		setBasket: (state, action) => {
			state.basket = action.payload;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(addBasketItemAsync.pending, (state, action) => {
			state.status = "pendingAddItem" + action.meta.arg.productId;
		});
		builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
			state.basket = action.payload;
			state.status = "idle";
		});
		builder.addCase(addBasketItemAsync.rejected, (state, action) => {
			state.status = "idle";
			console.log(action.payload);
		});

		builder.addCase(removeBasketItemAsync.pending, (state, action) => {
			state.status =
				"pendingRemoveItem" + action.meta.arg.productId + action.meta.arg.name;
		});
		builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
			state.basket = action.payload;
			state.status = "idle";
		});
		builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
			state.status = "idle";
			console.log(action.payload);
		});
	},
});

export const { setBasket } = basketSlice.actions;
