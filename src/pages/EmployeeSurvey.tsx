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
  readUserData,
  readUserEmails,
  writeEmployeeData,
} from "../backend/command";
import SimpleTextField from "../components/SimpleTextField";
import ProgressSlider from "../components/ProgressSlider";
import { useNavigate } from "react-router-dom";
import bgm from '../assets/bgm.png'
import naut_logo_gray from '../assets/naut-logo-gray.png'
import { User } from "./Homepage";

type IEmail = {
  label: string;
  id: number;
}


const EmployeeSurvey: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [employeeEmails, setEmployeeEmails] = useState<IEmail[]>([])
  const [emailToRefMap, setEmailToRefMap] = useState<{ [ref: string]: string }>({});

  const [currPopulateUser, setCurrPopulateUser] = useState<populateUser>();
  const [currSelectedUserRef, setCurrSelectedUserRef] = useState("");
  // Change population data
  useEffect(() => {
    readUserData(currSelectedUserRef).then((result) => {
      const user: populateUser = {
        email: result.email,
        education: result.education,
        name: result.name,
        gender: result.gender,
        position: result.position,
        id: result.id,
        isAdmin: result.isAdmin,
        // Add other properties as needed
      } as populateUser;
      setCurrPopulateUser(user);
    }).catch((err) => {
      throw new Error(err.message)
    });
  }, [currSelectedUserRef])
  // Get emails and get map from email to hash
  useEffect(() => {
    readUserEmails().then((res) => {
      setEmployeeEmails(
        Object.values(res).map((e: any, idx: number) => ({
          "label": e.email || "No email" + String(idx),
          "id": idx + 1,
        } as IEmail)
        ));

      setEmailToRefMap(() => {
        const newMap: { [ref: string]: string } = {};
        for (const entry of Object.keys(res)) {
          const resEntry = res[entry as keyof typeof res];
          newMap[resEntry.email] = entry;
        }

        return newMap;
      });
    })
  });

  type populateUser = User & {
    email: string,
    education: string,
    name: string,
    gender: string,
    position: string,
    id: number,
    isAdmin: boolean,
  }


  const initialValues = { ...EmployeeSurveyFormInitialValues, ...currPopulateUser };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        // Handle form submission here
        console.log("VALUES ARE", values);
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
          values.feedback,
          false,
          values.isAdmin,
        )
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
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="h3"
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
                    <img src={naut_logo_gray} alt="logo" height="60px" width="60px" style={{ marginRight: '5px' }} />
                    Employee Survey
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
                  <span>Employee Information</span>
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <Field
                      render={() => (
                        <Autocomplete
                          options={employeeEmails}
                          defaultValue={employeeEmails[0]}
                          isOptionEqualToValue={(option, value) => {
                            return option.label === value.label;
                          }}
                          onSelect={(event: any) => {
                            formikProps.setFieldValue("email", event.target.value)
                            setCurrSelectedUserRef(emailToRefMap[event.target.value])
                            // formikProps.setFieldValue("education", currPopulateUser?.education)
                          }}
                          renderInput={(params) => <SimpleTextField
                            name="email"
                            label="Employee Email"
                            {...params}
                          />
                          }
                        />
                      )}
                    />
                  </Grid>
                  {/* <Grid item xs={6} md={6}>
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
                </Grid> */}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                    />
                  </Grid>
                  {/* label={
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Star fontSize="small" sx={{ marginRight: '5px' }} /> Performance (0-100)
                      </div>
                    }    */}
                  <Grid item xs={12} md={12}>
                    <Field
                      render={() => (
                        <ProgressSlider
                          name="performance"
                          min={0}
                          max={100}
                          defaultValue={0}
                          header={
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Star fontSize="small" sx={{ marginRight: "5px" }} />
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
                                Employee performance (0-100)
                              </Typography>
                            </div>
                          }
                          disabled={isSubmitting}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                {/* Skills Section */}
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
                  <CardMembership fontSize="large" sx={{ marginRight: "10px" }} />{" "}
                  Skills
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Field
                      render={() => (
                        <ProgressSlider
                          name="communication"
                          min={0}
                          max={100}
                          defaultValue={0}
                          header={
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Chat fontSize="small" sx={{ marginRight: "5px" }} />
                              Communication (0-100)
                            </div>
                          }
                          disabled={isSubmitting}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      render={() => (
                        <ProgressSlider
                          name="creativity"
                          min={0}
                          max={100}
                          defaultValue={0}
                          header={
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Star fontSize="small" sx={{ marginRight: "5px" }} />
                              Creativity (0-100)
                            </div>
                          }
                          disabled={isSubmitting}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      render={() => (
                        <ProgressSlider
                          name="problem_solving"
                          min={0}
                          max={100}
                          defaultValue={0}
                          header={
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Star fontSize="small" sx={{ marginRight: "5px" }} />
                              Problem Solving (0-100)
                            </div>
                          }
                          disabled={isSubmitting}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      render={() => (
                        <ProgressSlider
                          name="teamwork"
                          min={0}
                          max={100}
                          defaultValue={0}
                          header={
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Chat fontSize="small" sx={{ marginRight: "5px" }} />
                              Teamwork (0-100)
                            </div>
                          }
                          disabled={isSubmitting}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      render={() => (
                        <ProgressSlider
                          name="time_management"
                          min={0}
                          max={100}
                          defaultValue={0}
                          header={
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Chat fontSize="small" sx={{ marginRight: "5px" }} />
                              Time Management (0-100)
                            </div>
                          }
                          disabled={isSubmitting}
                        />
                      )}
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
                  <Chat fontSize="large" sx={{ marginRight: "10px" }} /> Feedback
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <SimpleTextField
                      name="feedback"
                      label="Feedback"
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
                  <Chat fontSize="large" sx={{ marginRight: "10px" }} /> Skills
                  Review
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <SimpleTextField
                      name="skillsReview"
                      label="Skills Review (What skills do you think this employee needs to improve on the most?)"
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
    </Formik>
  );
};

export default EmployeeSurvey;
