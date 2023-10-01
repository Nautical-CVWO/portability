import React, { useEffect, useRef, useState } from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import { EmployeeSurveyFormInitialValues } from "../types/EmployeeSurveyFormData";
import {
    Card,
    Grid,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Autocomplete,
    CardContent,
    Avatar,
    Icon,
} from "@mui/material";
import {
    AccountCircle,
    CardMembership,
    EmojiPeople,
    School,
    Star,
    Chat,
    SupervisorAccount,
    KeyboardDoubleArrowLeft,
} from "@mui/icons-material";
import {
    readCurrentUserData,
    readUserData,
    readUserEmails,
    writeEmployeeData,
    writeSelfAssessmentData,
} from "../backend/command";
import SimpleTextField from "../components/SimpleTextField";
import ProgressSlider from "../components/ProgressSlider";
import { useNavigate } from "react-router-dom";
import bgm from '../assets/bgm.png'
import naut_logo_gray from '../assets/naut-logo-gray.png'
import { User } from "./Homepage";
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';

type IEmail = {
    label: string;
    id: number;
}


export type SelfAssessmentUser = Omit<User & {
    email: string,
    education: string,
    name: string,
    gender: string,
    position: string,
    id: number,
    feedback: string,
    skillsReview: string,
}, "username">

const EmployeeSelfAssessment: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // To get data for population

    const [user, setUser] = useState<SelfAssessmentUser | undefined>();

    useEffect(() => {
        readCurrentUserData()
            .then((res) => {
                if (res !== undefined) {
                    readUserData(res).then((result) => {
                        console.log(result)
                        const user: SelfAssessmentUser = {
                            uid: res,
                            points: result.points ? result.points : 0,
                            email: result.email,
                            // Add other properties as needed
                            education: result.education,
                            name: result.name,
                            gender: result.gender,
                            position: result.position,
                            id: result.id,
                            feedback: result.feedback,
                            skillsReview: result.skillsReview,
                        };
                        setUser(user);
                    }).catch((err) => {
                        throw new Error(err.message)
                    })
                }

            }).catch((err) => {
                throw new Error(err.message)
            })
    }, [])


    const initialValues = { ...EmployeeSurveyFormInitialValues, ...user, ...{ skillsReview: "" } };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    // Handle form submission here
                    console.log("VALUES ARE", values);
                    setIsSubmitting(true);
                    writeSelfAssessmentData(
                        {
                            ...values,
                            uid: values.uid || "",
                        }
                    );
                    setTimeout(() => {
                        setIsSubmitting(false);
                    }, 2000);
                    navigate("/");
                    window.alert(`Survey for employee (${values.email}) is successful!`)
                }}
                enableReinitialize
            >
                {(formikProps: FormikProps<any>) => {
                    return (
                        <div style={{ backgroundImage: `url(${bgm})`, paddingTop: "3%", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", minHeight: '100vh', paddingBottom: "3%" }}>
                            <Form >
                                <Grid container>
                                    <Grid item xs={3}>
                                        <Button variant="outlined" onClick={() => navigate('/')}
                                            sx={{ marginLeft: "60px", marginTop: '30px', position: 'relative', bottom: '10px' }}>
                                            <KeyboardDoubleArrowLeft />Return to Homepage
                                        </Button>
                                        <div style={{
                                            display: "flex",
                                            marginLeft: "60px",
                                            alignItems: "center",
                                            paddingTop: "4%"

                                        }}>
                                            <Typography
                                                variant="h3"
                                                sx={{
                                                    fontFamily: "Montserrat",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "white",
                                                    paddingRight: '23px',
                                                    marginBottom: '30px',

                                                }}
                                            >
                                                <img src={naut_logo_gray} alt="logo" height="60px" width="60px" style={{ marginRight: '5px' }} />
                                                Self-Assessment
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={3} />

                                    <Grid item xs={6}>
                                        <div style={{ display: "flex", justifyContent: "right", marginRight: "60px", marginTop: "20px", height: '80%', marginBottom: '20px' }}>

                                            <Card elevation={3} style={{ borderRadius: '15px', minWidth: '350px', maxWidth: '400px', border: '1px solid red' }}>
                                                <CardContent>
                                                    <Typography variant="h6" component="div" style={{ marginBottom: '10px' }}>{`Employee Digital Skills Card`}</Typography>
                                                    <div style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        flexDirection: "column"
                                                    }}>
                                                        <Typography variant="h4" color="#189900" style={{ textAlign: 'center' }}>
                                                            {user?.points} <Inventory2RoundedIcon sx={{ marginLeft: '5px' }} />
                                                        </Typography>
                                                        <div style={{ height: '8px ' }} />
                                                        <Typography variant="h5" component="div" style={{ textAlign: 'center', marginBottom: '10px' }}>
                                                            {user?.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center' }}>
                                                            {user?.email}
                                                        </Typography>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Card
                                    sx={{
                                        margin: "0px 60px 60px 60px",
                                        padding: "30px",
                                        borderRadius: "12px",
                                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                                        opacity: '90%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start'
                                    }}
                                >

                                    {/* Employee Information Section */}
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            marginBottom: "20px",
                                            fontFamily: "Montserrat",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <AccountCircle fontSize="large" sx={{ marginRight: "10px" }} />
                                        <span>Your Information</span>
                                    </Typography>

                                    <Grid container spacing={2}>
                                        <Grid item xs={6} md={6}>
                                            <Field
                                                type="text"
                                                as={SimpleTextField}
                                                name="email"
                                                label="Employee Email"
                                                disabled
                                            />
                                        </Grid>

                                        <Grid item xs={6} md={6}>
                                            <Field
                                                type="text"
                                                as={SimpleTextField}
                                                name="name"
                                                label="Employee Name"
                                                disabled={isSubmitting}
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <Field
                                                type="number"
                                                as={SimpleTextField}
                                                name="id"
                                                label="Employee ID"
                                                disabled
                                                isEmployeeSurvey
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <EmojiPeople
                                                            fontSize="small"
                                                            sx={{ marginRight: "5px" }}
                                                        />{" "}
                                                        Gender
                                                    </div>
                                                </InputLabel>
                                                <Field
                                                    name="gender"
                                                    as={Select}
                                                    label={
                                                        <div style={{ display: "flex", textAlign: "left" }}>
                                                            <EmojiPeople
                                                                fontSize="small"
                                                                sx={{ marginRight: "5px" }}
                                                            />{" "}
                                                            Gender
                                                        </div>
                                                    }
                                                    disabled={isSubmitting}
                                                >
                                                    <MenuItem
                                                        value="male"
                                                        style={{ display: "flex", textAlign: "left" }}
                                                    >
                                                        Male
                                                    </MenuItem>
                                                    <MenuItem value="female" style={{ textAlign: "left" }}>
                                                        Female
                                                    </MenuItem>
                                                    <MenuItem value="other" style={{ textAlign: "left" }}>
                                                        Other
                                                    </MenuItem>
                                                </Field>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Field
                                                as={SimpleTextField}
                                                name="education"
                                                label={
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <School
                                                            fontSize="small"
                                                            sx={{ marginRight: "5px" }}
                                                        />{" "}
                                                        Education
                                                    </div>
                                                }
                                                disabled={isSubmitting}
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <Field
                                                as={SimpleTextField}
                                                name="position"
                                                label={
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <SupervisorAccount
                                                            fontSize="small"
                                                            sx={{ marginRight: "5px" }}
                                                        />
                                                        Position
                                                    </div>
                                                }
                                                disabled
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* Feedback Section */}
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            marginTop: "20px",
                                            marginBottom: "20px",
                                            fontFamily: "Montserrat",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Chat fontSize="large" sx={{ marginRight: "10px" }} /> Workplace Feedback
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <SimpleTextField
                                                name="feedback"
                                                label="Feedback on the workplace environment etc."
                                                rows={4}
                                                disabled={isSubmitting}
                                                multiline
                                            />
                                        </Grid>
                                    </Grid>

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            marginTop: "20px",
                                            marginBottom: "20px",
                                            fontFamily: "Montserrat",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Chat fontSize="large" sx={{ marginRight: "10px" }} /> Review your skillset
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <SimpleTextField
                                                name="skillsReview"
                                                label="Skills Review (What skills would you like to learn the most?)"
                                                rows={4}
                                                disabled={isSubmitting}
                                                multiline
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box mt={3}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    fullWidth
                                                >
                                                    Submit
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>


                                </Card>
                            </Form>
                        </div>
                    )
                }}
            </Formik ></>
    );
};

export default EmployeeSelfAssessment;
