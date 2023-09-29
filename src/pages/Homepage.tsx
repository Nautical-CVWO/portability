import React from 'react'
import Header from './Header';
import EmployeeSurvey from './EmployeeSurvey';
import { Container, Typography, Box } from '@mui/material';


const Homepage: React.FC = () => {

    return (
        <Container disableGutters={true} maxWidth={false} sx={{ backgroundColor: '#1976d2', maxWith:'100%', width: "100%", padding: '0px', margin:'0px'}}>
            <Header />
            <Box sx={{ paddingLeft: '20px', paddingRight: '20px'}}>
                <Typography variant="h2" sx={{ marginBottom: '15px', fontFamily: 'Montserrat', display: 'flex', alignItems: 'left', justifyContent: 'flex-start' }}>
                    Nautical
                </Typography>
            </Box>
            
            
        </Container>
    )
}

export default Homepage;