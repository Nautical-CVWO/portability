import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import EmployeeSurvey from './pages/EmployeeSurvey';
import { ThemeProvider, createMuiTheme } from '@mui/material';
import SignIn from './pages/SignIn';
import Cert from './pages/Cert';
import Workshop from './pages/Workshop';
import RegisterEmployee from './pages/RegisterEmployee';
import TipsPage from './pages/TipsPage';
import TestTips from './pages/TestTips';
import EmployeeSelfAssessment from './pages/EmployeeSelfAssessment';

const theme = createMuiTheme();

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div style={{ width: '100%', minHeight: 'min-content', height: '100vh', backgroundColor: '#000' }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/employee_survey" element={<EmployeeSurvey />} />
              <Route path="/employee_self_survey" element={<EmployeeSelfAssessment />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<RegisterEmployee />} />
              <Route path="/cert" element={<Cert />} />
              <Route path="/workshop" element={<Workshop />} />
              <Route path="/tips" element={<TipsPage />} />
              <Route path="/testtips" element={<TestTips />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
