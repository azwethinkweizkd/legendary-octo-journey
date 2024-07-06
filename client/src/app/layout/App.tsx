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
import { useStoreContext } from "../context/useStoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";

function App() {
	const { setBasket } = useStoreContext();
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
				.then((basket) => setBasket(basket))
				.catch((err) => console.log(err));
		}
	}, [setBasket]);

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
