import { useState } from "react";
import { Catalog } from "../../routes/catalog/catalog";
import { Header } from "./header";
import {
	Container,
	CssBaseline,
	ThemeProvider,
	createTheme,
} from "@mui/material";

function App() {
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

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Header mode={darkMode} handleThemeChange={() => handleThemeChange()} />
			<Container>
				<Catalog />
			</Container>
		</ThemeProvider>
	);
}

export default App;
