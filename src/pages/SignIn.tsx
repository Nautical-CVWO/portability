import React, { useEffect, useState } from 'react'
import Header from './Header';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik, FormikProps } from 'formik';
import SimpleTextField from '../components/SimpleTextField';
import { EmployeeLoginInitialValues } from '../types/EmployeeSurveyFormData';
import { writeLoginData } from '../backend/command';


const SignIn: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
 

    }, [])


    return (
        <Container disableGutters={true} maxWidth={false}  sx={{ backgroundColor: '#161616', maxWith:'100%', width: "100%", height: 'min-content', minHeight: "100vh", padding: '0px', margin:'0px'}}>
            <Header user={undefined} setUser={() => {}} />
            <Box sx={{ width: '100%', display:'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'center'}}>
            <Box sx={{ width: '70%', borderRadius: '20px', margin : '20px', backgroundColor: 'white', padding: '20%', paddingTop: '50px'}}>
            <Typography
                variant="h6"
                sx={{
                  marginBottom: "15px",
                  fontFamily: "Montserrat",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
            >Employee Login</Typography>
            <Formik
                initialValues={EmployeeLoginInitialValues}
                onSubmit={(values) => {
                    // Handle form submission here
                    setIsSubmitting(true);
                    writeLoginData(values.email, values.password).then((res) => {
                        setIsSubmitting(false); 
                        navigate('/');
                    }).catch((err) => {
                        alert(err.message)
                    });
                    
                }}
            >
            {(formikProps: FormikProps<any>) => (
                <Form>
                    <Grid item xs={6} md={6}>
                        <Field
                        render={() => (
                            <SimpleTextField 
                                name="email"
                                label="Email"
                                disabled={isSubmitting}
                            />
                        )} />
                    </Grid>
                    <Box sx={{height: '20px'}}></Box>
                    <Grid item xs={6} md={6}>
                        <Field
                        render={() => (
                            <SimpleTextField 
                                name="password"
                                label="Password"
                                disabled={isSubmitting}
                                type="password"
                            />
                        )} />
                    </Grid>
                    <Box my={5} mt={3}>
                    <Button type="submit" variant="outlined" color="inherit" fullWidth>
                        Login
                    </Button>
                    </Box>
                </Form>
            )}
            </Formik>
        </Box>
            </Box>
           
   
        </Container>
    )
}

export default SignIn;