import {
	AppBar,
	Badge,
	Box,
	IconButton,
	List,
	ListItem,
	Toolbar,
	Typography,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";

const midLinks = [
	{
		title: "catalog",
		path: "catalog",
	},
	{
		title: "about",
		path: "/about",
	},
	{
		title: "contact",
		path: "/contact",
	},
];

const rightLinks = [
	{
		title: "login",
		path: "/login",
	},
	{
		title: "register",
		path: "/register",
	},
];

const navStyles = {
	color: "inherit",
	textDecoration: "none",
	typography: "h6",
	"&:hover": {
		color: "grey.500",
	},
	"&.active": {
		color: "text.secondary",
	},
};
interface Props {
	mode: boolean;
	handleThemeChange: () => void;
}
export const Header = ({ mode, handleThemeChange }: Props) => {
	return (
		<AppBar sx={{ mb: 12 }}>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Box display="flex" alignItems="center">
					<Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
						Re-Store
					</Typography>
					<IconButton
						sx={{ ml: 1 }}
						onClick={handleThemeChange}
						color="inherit">
						{mode ? <Brightness7Icon /> : <Brightness4Icon />}
					</IconButton>
				</Box>

				<List sx={{ display: "flex" }}>
					{midLinks.map(({ title, path }) => (
						<ListItem key={path} component={NavLink} to={path} sx={navStyles}>
							{title.toUpperCase()}
						</ListItem>
					))}
				</List>

				<Box display="flex" alignItems="center">
					<IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
						<Badge badgeContent="4" color="secondary">
							<ShoppingCart />
						</Badge>
					</IconButton>
					<List sx={{ display: "flex" }}>
						{rightLinks.map(({ title, path }) => (
							<ListItem key={path} component={NavLink} to={path} sx={navStyles}>
								{title.toUpperCase()}
							</ListItem>
						))}
					</List>
				</Box>
			</Toolbar>
		</AppBar>
	);
};
