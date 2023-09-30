import React, { useState } from "react";
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
} from "@mui/material";
import {
  AccountCircle,
  EmojiPeople,
  School,
  SupervisorAccount,
  KeyboardDoubleArrowLeft,
} from "@mui/icons-material";
import {
  writeEmployeeData,
} from "../backend/command";
import SimpleTextField from "../components/SimpleTextField";
import { useNavigate } from "react-router-dom";
import bgm from '../assets/bgm.png'
import naut_logo_gray from '../assets/naut-logo-gray.png'

const RegisterEmployee: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={EmployeeSurveyFormInitialValues}
      onSubmit={(values) => {
        // Handle form submission here
        setIsSubmitting(true);
        writeEmployeeData(
          values.email,
          values.password,
          values.id,
          values.name,
          values.gender,
          values.education,
          values.position,
          values.performance,
          values.skillsReview,
          values.communication,
          values.creativity,
          values.problem_solving,
          values.teamwork,
          values.time_management,
          values.feedback
        ) 
        setTimeout(() => {
          setIsSubmitting(false);
        }, 2000);
        navigate("/");
      }}
    >
      {(formikProps: FormikProps<any>) => (
        <div style={{ backgroundImage: `url(${bgm})`, paddingTop: "3%", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", minHeight: '100vh', paddingBottom: "3%"}}>
          <Form >
            <Grid container>
              <Grid item xs={3} sx={{
                display: "flex",
                alignItems: "center"
              }}>
                <Button variant="outlined" onClick={() => navigate('/')}
                        sx={{ marginLeft: "60px", marginTop: '30px', position: 'relative', bottom: '3px'}}>
                  <KeyboardDoubleArrowLeft />Return to Homepage
                </Button>
              </Grid>  
              <Grid item xs={6}>
                <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "Montserrat",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      paddingRight: '23px',
                      marginBottom: '30px'
                    }}
                >
                  <img src={naut_logo_gray} alt="logo" height="60px" width="60px" style={{ marginRight: '5px' }}/>
                  Register as New Employee
                </Typography>
              </Grid>
              <Grid item xs={3} />
            </Grid>
            <Card
              sx={{
                margin: "0px 60px 60px 60px",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                opacity: '90%'
              }}
            >      

              {/* Employee Information Section */}
              <Typography
                variant="h6"
                sx={{
                  marginBottom: "15px",
                  fontFamily: "Montserrat",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AccountCircle fontSize="large" sx={{ marginRight: "10px" }} />
                <span>Employee Information</span>
              </Typography>

              <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                  <Field
                    render={() => (
                      <SimpleTextField
                        name="email"
                        label="Employee Email"
                        disabled={isSubmitting}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <Field
                    type="number"
                    render={() => (
                      <SimpleTextField
                        name="password"
                        label="Employee password"
                        type="number"
                        disabled={isSubmitting}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <Field
                    render={() => (
                      <SimpleTextField
                        name="name"
                        label="Employee Name"
                        disabled={isSubmitting}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <Field
                    type="number"
                    render={() => (
                      <SimpleTextField
                        name="id"
                        label="Employee ID"
                        type="number"
                        disabled={isSubmitting}
                      />
                    )}
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
                    render={() => (
                      <SimpleTextField
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
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <Field
                    render={() => (
                      <SimpleTextField
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
                        disabled={isSubmitting}
                      />
                    )}
                  />
                </Grid>
                
              </Grid>

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
            </Card>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default RegisterEmployee;
