import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { SetStateAction, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import naut_logo from '../assets/naut-logo.png'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import {
  logoutData
} from "../backend/command";
import { User } from "./Homepage"
import { ref, onValue, DataSnapshot } from "firebase/database";
import { db } from '../backend/firebase';

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
  user?: User | undefined;
  setUser: (newUser: User | undefined) => void;
  isAdmin?: boolean;
}

const menuItemStyle = {
  "&:hover": {
    backgroundColor: "black",
    color: "green", // Change the color to your desired hover color
  },
  color: "black",
  backgroundColor: 'white',
  border: "1px solid white",
  fontSize: '13px',
};

const dropDownStyle = {
  backgroundColor: '#292A2C',
  color: "white",
  fontSize: '14px',
  padding: '0px',
};

const Header = ({ user, setUser, isAdmin = false }: HeaderProps) => {
  const navItems = isAdmin ? ["Home", "Assess Employees", "Workshop", "Dashboard"] : ["Home", "Workshop", "Dashboard"];
  const linkItems = isAdmin ? [
    "/",
    "/employee_survey",
    '/workshop',
    "https://nautical-analytics.streamlit.app/",
  ] :
    [
      "/",
      '/workshop',
      "https://nautical-analytics.streamlit.app/",
    ];
  const handleDrawerToggle = () => { };
  // const location = useLocation();
  const navigate = useNavigate();
  const [userSelectedValue, setUserSelectedValue] = useState("points");
  const handleUserSelectionChange = (event: SelectChangeEvent) => {
    setUserSelectedValue(event.target.value);
  };

  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    setUserSelectedValue("points");
    const reference = ref(db, `employees/${user?.uid}/`);

    const onDataChange = (snapshot: DataSnapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData && userData.points !== undefined) {
          setUserPoints(userData.points);
        }
      }
    };

    // Set up a real-time listener for changes
    const unsubscribe = onValue(reference, onDataChange);

    // Return a cleanup function to remove the listener when the component unmounts
    return () => {
      unsubscribe(); // Remove the real-time listener
    };

  }, [user]);


  const logout = () => {
    logoutData().then((res) => {
      alert(res)

    }).then(() => navigate('/')).then(() => navigate(0))

  }

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

          <a href="/"><img src={naut_logo} alt="logo" height="40px" width="40px" style={{ marginRight: '5px' }} /></a>
          <Typography
            variant="h6"
            component="a"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block", textDecoration: "none", color: "inherit" } }}
            href="/"
          >NAUTICAL
          </Typography>



          {user === undefined ? <></> : (
            <FormControl sx={{ padding: '0px' }}>
              {/* <InputLabel>Welcome, {user} you have {points} </InputLabel> */}
              <Select
                value={userSelectedValue}
                onChange={handleUserSelectionChange}
                sx={dropDownStyle}
              >
                <MenuItem value="points" sx={menuItemStyle}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <div>
                      {`Welcome, ${user?.username} you have ${userPoints}`.toUpperCase()}
                    </div>
                    <div>
                      <Inventory2RoundedIcon sx={{ marginLeft: '5px', fontSize: '14px', marginTop: '5px' }} />
                    </div>
                  </div>
                </MenuItem>

                <MenuItem onClick={() => {
                  setUser(undefined);
                  logout();
                }} value="logout" sx={menuItemStyle}>LOGOUT</MenuItem>
              </Select>
            </FormControl>

          )}

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
