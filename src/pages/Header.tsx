import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import naut_logo from '../assets/naut-logo.png'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';

const linkStyle = { 
  textDecoration: "none", // Remove underline
  color: "white",
};

const buttonStyle = {
  "&:hover": {
    color: "blue", // Change the color to your desired hover color
  },
};

interface HeaderProps {
  user?: string,
  points?: number
}

const Header = ({user, points}: HeaderProps) => {
  const navItems = ["Home", "Employee Survey", "Dashboard"];
  const linkItems = [
    "/",
    "/employee_survey",
    "https://nautical-analytics.streamlit.app/",
  ];
  const handleDrawerToggle = () => {};
  return (
    <Box sx={{ display: "flex", color: "#161616" }}>
      <CssBaseline />
      <AppBar sx={{ background: "#161616" }} component="nav" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton >
          <img src={naut_logo} alt="logo" height="40px" width="40px" style={{ marginRight: '5px' }}/>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            
            NAUTICAL
          </Typography>
          <Box sx={{ marginRight: '15px', display: { xs: "none", sm: "block" } }}>
            {user === "" ? <></> : (
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white", // Change the color to your desired hover color
                  },
                  color: "black",
                  backgroundColor: 'white',
                  border: "1px solid white"
                }}
              >
                 Welcome, {user} you have {points} 
                 <Inventory2RoundedIcon sx={{marginLeft: '5px'}} />
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((index, item) => (
              <Button
                sx={{
                  "&:hover": {
                    color: "black", // Change the color to your desired hover color
                  },
                }}
              >
                <Link style={linkStyle} to={linkItems[Number(item)]}>
                  {navItems[Number(item)]}
                </Link>
              </Button>
            ))}
          </Box>
          
        </Toolbar>
      </AppBar>
      <nav></nav>
    </Box>
  );
};

export default Header;
