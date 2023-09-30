import React, { useEffect, useState } from 'react'
import Header from './Header';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik, FormikProps } from 'formik';
import SimpleTextField from '../components/SimpleTextField';
import { EmployeeCertInitialValues, EmployeeLoginInitialValues } from '../types/EmployeeSurveyFormData';
import { readCurrentUserData, readUserData, writeLoginData } from '../backend/command';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import CustomButton from '../components/CustomButton';

interface User {
    // Define the properties of your User interface here
    uid: string;
    username: string;
    points?: number;
    isAdmin?: boolean;
    // Add other properties as needed
}

const Workshop: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState<User | undefined>();
    useEffect(() => {
        readCurrentUserData()
        .then((res) => {
            readUserData(res).then((result) => {
                console.log(result)
                const user: User = {
                    uid: res,
                    points: result.points ? result.points : 0,
                    username: result.name,
                    isAdmin: result.isAdmin
                    // Add other properties as needed
                };
                setUser(user);
            }).catch((err) => {
                throw new Error(err.message)
            })
            
        }).catch((err) => {
            throw new Error(err.message)
        })

    }, [])


    return (
        <Container disableGutters={true} maxWidth={false}  sx={{ backgroundColor: '#161616', maxWith:'100%', width: "100%", height: 'min-content', padding: '0px', margin:'0px'}}>
            <Header points={user?.points} user={user?.username} />
            <Box sx={{ padding: '30px', paddingLeft: '60px', height: '200px', display:'flex', flexDirection:'column', alignItems: 'flex-start'}}>
                <Typography variant="h4" sx={{ marginBottom: '15px',  fontFamily: 'Montserrat', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', color:'white' }}>
                    Workshop Lists
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: '15px',fontFamily: 'Montserrat', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', color:'white' }}>
                    Register these workshops to get additional 50 <Inventory2RoundedIcon sx={{marginLeft: '5px'}} />.
                    Note that not attending these workshops after signing up will not award any points
                </Typography>
            </Box>
            { user?.isAdmin ? (<Box>
                <Typography variant="h6" sx={{ marginBottom: '15px',fontFamily: 'Montserrat', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', color:'white' }}>
                    HR Admin Form 
                </Typography>
                <Formik
                initialValues={EmployeeCertInitialValues}
                onSubmit={(values) => {
                    // Handle form submission here
                    setIsSubmitting(true);
                    //writeLoginData(values.certUrl);
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
                                name="workshopName"
                                label="Workshop"
                                disabled={isSubmitting}
                            />
                        )} />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Field
                        render={() => (
                            <SimpleTextField 
                                name="workshopDate"
                                label="Workshop Date"
                                disabled={isSubmitting}
                            />
                        )} />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Field
                        render={() => (
                            <SimpleTextField 
                                name="workshopPoints"
                                label="Workshop Points"
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
                
            </Box>) : <></>}
            
        </Container>
    )
}

export default Workshop;