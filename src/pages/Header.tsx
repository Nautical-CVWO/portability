import { AppBar, Box, Button, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const linkStyle = {
  textDecoration: 'none', // Remove underline
  color: 'white'
};

const buttonStyle = {
  '&:hover': {
    color: 'blue', // Change the color to your desired hover color
  },
};

const Header = () => {
  const navItems = ['Home', 'Employee Survey', 'Contact'];
  const linkItems = ['Home', '/employee_survey', 'Contact'];
  const handleDrawerToggle = () => {

  }
  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar component="nav" position="static">
      <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            NAUTICAL
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((index, item) => (
                <Button sx={{
                  '&:hover': {
                    color: 'black', // Change the color to your desired hover color
                  },
                }}>
                  <Link style={linkStyle} to={linkItems[Number(item)]}>{navItems[Number(item)]}</Link>
                </Button>
                
            ))}
          </Box>
        </Toolbar>
    </AppBar>
    <nav>
      
      </nav>
    </Box>
  )
}

export default Header;