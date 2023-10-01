import React, { useEffect, useState } from 'react'
import Header from './Header';
import { Container, Typography, Box, Grid, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik, FormikProps } from 'formik';
import SimpleTextField from '../components/SimpleTextField';
import { EmployeeCertInitialValues, EmployeeLoginInitialValues } from '../types/EmployeeSurveyFormData';
import { readCurrentUserData, readUserData, writeCertData, writeLoginData } from '../backend/command';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import { ref, onValue } from "firebase/database";
import { db } from '../backend/firebase';
import CertificateCard from '../components/CertificateCard';
import { KeyboardDoubleArrowLeft } from '@mui/icons-material';

interface User {
    // Define the properties of your User interface here
    uid: string;
    username: string;
    points?: number;
    // Add other properties as needed
}

const Cert: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();
    const [userCertificates, setUserCertificates] = useState([]);

    useEffect(() => {
        readCurrentUserData()
            .then((res) => {
                readUserData(res).then((result) => {
                    const user: User = {
                        uid: res,
                        points: result.points ? result.points : 0,
                        username: result.name,
                        // Add other properties as needed
                    };
                    setUser(user);
                }).catch((err) => {
                    throw new Error(err.message)
                })

            }).catch((err) => {
                throw new Error(err.message)
            })

        const fetchCertificates = () => {
            const uid = user?.uid;
            const certificateDataRef = ref(db, `certificate/${uid}`);
            const unsubscribe = onValue(certificateDataRef, (snapshot) => {
                if (snapshot && snapshot.exists()) {
                    const data = snapshot.val();
                    setUserCertificates(data ? Object.values(data) : []);
                } else {
                    setUserCertificates([]);
                }
            });
            return () => {
                unsubscribe();
            };
        };
        fetchCertificates();
    }, [user]);

    const handleSetUser = (newUser: User | undefined) => {
        setUser(newUser);
    };

    return (
        <Container disableGutters={true} maxWidth={false} sx={{ backgroundColor: '#161616', maxWith: '100%', width: "100%", height: "100%", minHeight: '180vh', padding: '0px', margin: '0px' }}>
            <Header user={user} setUser={handleSetUser} />
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ padding: '30px', paddingLeft: '60px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', backgroundColor: '#161616', }}>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant="outlined" onClick={() => navigate('/')}
                            sx={{ marginTop: '30px', position: 'relative', bottom: '10px' }}>
                            <KeyboardDoubleArrowLeft />Return to Homepage
                        </Button>
                        <Typography variant="h4" sx={{ marginBottom: '15px', textAlign: 'center', fontFamily: 'Montserrat', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', color: 'white' }}>
                            Certificate Upload
                        </Typography>
                        <Typography variant="h6" sx={{ marginBottom: '15px', textAlign: 'center', fontFamily: 'Montserrat', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', color: 'white' }}>
                            Upload Your Certificate to get additional 50 <Inventory2RoundedIcon sx={{ marginLeft: '5px' }} />
                        </Typography>
                    </div>
                </Box>
                <Box sx={{ alignItems: 'center', justifyContent: 'center', width: '70%', backgroundColor: 'white', borderRadius: '20px', padding: '30px', height: '200px', display: 'flex', flexDirection: 'column' }}>
                    <Formik
                        // sx={{ width: '100%'}}
                        initialValues={EmployeeCertInitialValues}
                        onSubmit={(values) => {
                            // Handle form submission here
                            setIsSubmitting(true);
                            writeCertData(user ? user.uid : "", values.certUrl);
                            setTimeout(() => {
                                setIsSubmitting(false);
                            }, 2000);
                            // navigate('/');
                        }}
                    >
                        {(formikProps: FormikProps<any>) => (
                            <Form>
                                <Grid item xs={6} md={6}>
                                    <Field
                                        render={() => (
                                            <SimpleTextField
                                                name="certUrl"
                                                label="Certificate Url"
                                                disabled={isSubmitting}
                                            />
                                        )} />
                                </Grid>
                                <Box mt={3}>
                                    <Button type="submit" variant="outlined" color="inherit" fullWidth>
                                        Submit
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>

            </Box>

            <Box sx={{ padding: '30px', paddingLeft: '60px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="h4" sx={{ marginBottom: '15px', fontFamily: 'Montserrat', display: 'flex', alignItems: 'flex-start', textAlign: 'left', color: 'white' }}>
                    Your Certificates
                </Typography>


                {userCertificates.length > 0 ? (
                    <Grid container spacing={2}>
                        {userCertificates.map((item: { url: string }, index) => {
                            const uid = user?.uid || '';
                            return (
                                <CertificateCard
                                    index={index + 1}
                                    url={item.url}
                                    uid={uid}
                                    key={index}
                                />)
                        })}
                    </Grid>
                ) : (
                    <Box sx={{ padding: '30px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4" sx={{ marginBottom: '15px', textAlign: 'center', fontFamily: 'Montserrat', color: 'white' }}>
                            No Certificates Uploaded
                        </Typography>
                    </Box>
                )}


            </Box>

        </Container >
    )
}

export default Cert;