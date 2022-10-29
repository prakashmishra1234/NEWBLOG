import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Routeconstant } from "../navigation/Routeconstant";
import { LOCALSTORAGE_KEY } from "../config";

const drawerWidth = 240;
const navItems = ["Home", "About"];

function Header(props) {
  const Navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [login, setLogin] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    console.log(user);
    if (user && user.data.length) {
      setLogin(true);
    }
  }, []);

  const onClickMenuItem = (item) => {
    if (item === "About") {
      Navigate(Routeconstant.ABOUT);
    } else if (item === "Home") {
      Navigate(Routeconstant.HOME);
    } else if (item === "Login") {
      Navigate(Routeconstant.LOGIN);
    } else if (item === "Logout") {
      localStorage.removeItem("BLOG");
      Navigate(Routeconstant.LOGIN);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        YOURSBLOG
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item}
            disablePadding
            onClick={() => onClickMenuItem(item)}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        {login ? (
          <ListItem disablePadding onClick={() => onClickMenuItem("Logout")}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding onClick={() => onClickMenuItem("Login")}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Login"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }} style={{ height: "4rem" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            YOURSBLOG
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "#000" }}
                onClick={() => onClickMenuItem(item)}
              >
                {item}
              </Button>
            ))}
            {login ? (
              <Button
                sx={{ color: "#000" }}
                onClick={() => onClickMenuItem("Logout")}
              >
                {"Logout"}
              </Button>
            ) : (
              <Button
                sx={{ color: "#000" }}
                onClick={() => onClickMenuItem("Login")}
              >
                {"Login"}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Header;
