import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            color="inherit"
            component={NavLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none" }}
          >
            Calorie tracker
          </Typography>
          <Button color="inherit" component={NavLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={NavLink} to="/meal/add">
            Add meal
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
