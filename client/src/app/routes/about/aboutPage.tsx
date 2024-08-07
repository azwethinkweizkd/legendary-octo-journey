import {
	Alert,
	AlertTitle,
	Button,
	ButtonGroup,
	Container,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import { useState } from "react";
import agent from "../../api/agent";
import { ToastContainer } from "react-toastify";

export const About = () => {
	const [validationErrors, setValidationErrors] = useState<string[]>([]);

	function getValidationError() {
		agent.TestErrors.getValidationError()
			.then(() => console.log("should not see this!"))
			.catch((error) => setValidationErrors(error));
	}

	return (
		<Container sx={{ marginTop: "72px" }}>
			<Typography gutterBottom variant={"h2"}>
				Errors for testing purposes
			</Typography>
			<ButtonGroup fullWidth>
				<Button
					onClick={() =>
						agent.TestErrors.get500Error().catch((error) =>
							console.error(error)
						)
					}
					variant={"contained"}>
					Test 500 error
				</Button>
				<Button
					onClick={() =>
						agent.TestErrors.get404Error().catch((error) =>
							console.error(error)
						)
					}
					variant={"contained"}>
					Test 404 error
				</Button>
				<Button
					onClick={() =>
						agent.TestErrors.get400Error().catch((error) =>
							console.error(error)
						)
					}
					variant={"contained"}>
					Test 400 error
				</Button>
				<Button onClick={getValidationError} variant={"contained"}>
					Test 400 validation error
				</Button>
				<Button
					onClick={() =>
						agent.TestErrors.get401Error().catch((error) =>
							console.error(error)
						)
					}
					variant={"contained"}>
					Test 401 error
				</Button>
			</ButtonGroup>
			{validationErrors.length > 0 && (
				<Alert severity="error">
					<AlertTitle>Validation Errors</AlertTitle>
					<List>
						{validationErrors.map((error) => (
							<ListItem key={error}>
								<ListItemText>{error}</ListItemText>
							</ListItem>
						))}
					</List>
				</Alert>
			)}
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</Container>
	);
};
