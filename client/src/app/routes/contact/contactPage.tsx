import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { decrement, increment } from "./counterSlice";

export const ContactPage = () => {
	const dispatch = useAppDispatch();
	const { data, title } = useAppSelector((state) => state.counter);
	return (
		<>
			<Typography variant="h3" marginTop="96px">
				{title}
			</Typography>
			<Typography variant="h3" marginTop="96px">
				The data is: {data}
			</Typography>
			<ButtonGroup>
				<Button
					onClick={() => dispatch(decrement(1))}
					variant="contained"
					color="error">
					Decrement
				</Button>
				<Button
					onClick={() => dispatch(increment(1))}
					variant="contained"
					color="primary">
					Increment
				</Button>
				<Button
					onClick={() => dispatch(increment(5))}
					variant="contained"
					color="secondary">
					Increment by 5
				</Button>
			</ButtonGroup>
		</>
	);
};
