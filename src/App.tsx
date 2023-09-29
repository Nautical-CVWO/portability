import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import { ThemeProvider, createMuiTheme } from '@mui/material';

const theme = createMuiTheme();

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      
        
      </div>
    </ThemeProvider>
    </>
  );
}

export default App;
