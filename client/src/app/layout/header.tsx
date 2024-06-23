import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
interface Props {
	mode: boolean;
	handleThemeChange: () => void;
}
export const Header = ({ mode, handleThemeChange }: Props) => {
	return (
		<AppBar sx={{ mb: 12 }}>
			<Toolbar>
				<Typography variant="h6">Re-Store</Typography>
				<IconButton sx={{ ml: 1 }} onClick={handleThemeChange} color="inherit">
					{mode ? <Brightness7Icon /> : <Brightness4Icon />}
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};
