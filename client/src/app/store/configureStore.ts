import { createStore } from "@reduxjs/toolkit";
import counterReducer from "../routes/contact/counterReducer";

export function configureStore() {
	return createStore(counterReducer);
}
