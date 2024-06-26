import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export const ServerError = () => {
	const { state } = useLocation();
	return (
		<Container component={Paper} sx={{ marginTop: "96px" }}>
			{state?.error ? (
				<>
					<Typography gutterBottom variant="h3" color="secondary">
						{state.error.title}
					</Typography>
					<Divider />
					<Typography variant="body1">
						{state.error.detail || "Internal server error"}
					</Typography>
				</>
			) : (
				<Typography gutterBottom variant="h5">
					Server error
				</Typography>
			)}
			<Button fullWidth component={Link} to="/catalog">
				Go back to shop
			</Button>
		</Container>
	);
};
