import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import EmployeeSurvey from './pages/EmployeeSurvey';
import { ThemeProvider, createMuiTheme } from '@mui/material';
import SignIn from './pages/SignIn';
import Cert from './pages/Cert';
import Workshop from './pages/Workshop';

const theme = createMuiTheme();

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
    <div style={{ width: '100%', minHeight: 'min-content', height:'100vh', backgroundColor: '#000' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/employee_survey" element={<EmployeeSurvey />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/cert" element={<Cert />} />
            <Route path="/workshop" element={<Workshop />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
    </>
  );
}

export default App;
