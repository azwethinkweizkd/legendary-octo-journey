import { useEffect, useState } from "react";
import { Header } from "./header";
import {
	Container,
	CssBaseline,
	ThemeProvider,
	createTheme,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../routes/basket/basketSlice";

function App() {
	const dispatch = useAppDispatch();
	const [darkMode, setDarkMode] = useState(false);
	const paletteType = darkMode ? "dark" : "light";

	const theme = createTheme({
		palette: {
			mode: paletteType,
			background: {
				default: paletteType === "light" ? "#eaeaea" : "#121212",
			},
		},
	});

	const handleThemeChange = () => {
		setDarkMode(!darkMode);
	};

	useEffect(() => {
		const buyerId = getCookie("buyerId");
		if (buyerId) {
			agent.Basket.get()
				.then((basket) => dispatch(setBasket(basket)))
				.catch((err) => console.error(err));
		}
	}, [dispatch]);

	return (
		<ThemeProvider theme={theme}>
			<ToastContainer position="bottom-right" hideProgressBar theme="colored" />
			<CssBaseline />
			<Header mode={darkMode} handleThemeChange={() => handleThemeChange()} />
			<Container>
				<Outlet />
			</Container>
		</ThemeProvider>
	);
}

export default App;
