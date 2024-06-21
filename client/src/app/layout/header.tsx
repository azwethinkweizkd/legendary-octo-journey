import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
interface Props {
	mode: boolean;
	handleThemeChange: () => void;
}
export const Header = ({ mode, handleThemeChange }: Props) => {
	return (
		<AppBar sx={{ mb: 12 }}>
			<Toolbar>
				<Typography variant="h6">Re-Store</Typography>
				<Switch checked={mode} onChange={handleThemeChange} />
			</Toolbar>
		</AppBar>
	);
};
