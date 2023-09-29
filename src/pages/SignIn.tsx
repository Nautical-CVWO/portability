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
        <Container disableGutters={true} maxWidth={false}  sx={{ backgroundColor: '#161616', maxWith:'100%', width: "100%", height: 'min-content', padding: '0px', margin:'0px'}}>
            <Header />
            <Formik
                initialValues={EmployeeLoginInitialValues}
                onSubmit={(values) => {
                    // Handle form submission here
                    setIsSubmitting(true);
                    writeLoginData(values.email, values.password);
                    setTimeout(() => {
                        setIsSubmitting(false); 
                    }, 2000);
                    navigate('/');
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
                    <Grid item xs={6} md={6}>
                        <Field
                        render={() => (
                            <SimpleTextField 
                                name="password"
                                label="Password"
                                disabled={isSubmitting}
                            />
                        )} />
                    </Grid>
                    <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                    </Box>
                </Form>
            )}
            </Formik>
        </Container>
    )
}

export default SignIn;