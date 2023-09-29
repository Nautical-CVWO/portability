import React from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import { EmployeeSurveyFormInitialValues } from '../types/EmployeeSurveyFormData';
import {
  Card,
  Grid,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import {
  AccountCircle,
  CardMembership,
  PeopleAlt,
  EmojiPeople,
  School,
  Star,
  Chat,
  ThumbUp,
  SupervisorAccount,
} from '@mui/icons-material';
import {
  writeEmployeeData,
  writeSkillsData,
  writeSatisfactionData,
  writeFeedbackData
} from '../backend/command';

const EmployeeSurvey: React.FC = () => {

  return (
    <Formik
      initialValues={EmployeeSurveyFormInitialValues}
      onSubmit={(values) => {
        // Handle form submission here
        console.log(values);
        writeEmployeeData(values.id, values.name, values.gender, values.education, values.position, values.performance)
      }}
    >
      {(formikProps: FormikProps<any>) => (
        <Form>
          <Card
            sx={{
              margin: '20px',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                marginBottom: '20px',
                fontFamily: 'Montserrat',
              }}
            >
            Employee Survey
            </Typography>

            {/* Employee Information Section */}
            <Typography variant="h6" sx={{ marginBottom: '15px', fontFamily: 'Montserrat' }}>
              <AccountCircle fontSize="large" sx={{ marginRight: '10px' }} />
              <span>Employee Information</span>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Field
                  name="name"
                  label="Employee Name"
                  component={TextField}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  name="id"
                  label="Employee ID"
                  component={TextField}
                  fullWidth
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>
                  <EmojiPeople fontSize="small" sx={{ marginRight: '5px' }} /> Gender
                  </InputLabel>
                  <Field name="gender" as={Select} label={
                    <>
                      <EmojiPeople fontSize="small" sx={{ marginRight: '5px' }} /> Gender
                    </>
                  }
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  name="education"
                  label={
                    <>
                      <School fontSize="small" sx={{ marginRight: '5px' }} /> Education
                    </>
                  }
                  component={TextField}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  name="position"
                  label={
                    <>
                      <SupervisorAccount fontSize="small" sx={{ marginRight: '5px' }} /> Position
                    </>
                  }
                  component={TextField}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  name="performance"
                  label={
                    <>
                      <Star fontSize="small" sx={{ marginRight: '5px' }} /> Performance (0-100)
                    </>
                  }
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  type="number"
                  InputProps={{
                    inputProps: { min: 0, max: 100 },
                  }}
                />
              </Grid>
            </Grid>

            {/* Skills Section */}
            <Typography variant="h6" sx={{ marginTop: '20px', marginBottom: '15px', fontFamily: 'Montserrat' }}>
              <CardMembership fontSize="large" sx={{ marginRight: '10px' }} /> Skills
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Field
                  name="communication"
                  label={
                    <>
                      <Chat fontSize="small" sx={{ marginRight: '5px' }} /> Communication (0-100)
                    </>
                  }
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  type="number"
                  InputProps={{
                    inputProps: { min: 0, max: 100 },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  name="creativity"
                  label={
                    <>
                      <Star fontSize="small" sx={{ marginRight: '5px' }} /> Creativity (0-100)
                    </>
                  }
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  type="number"
                  InputProps={{
                    inputProps: { min: 0, max: 100 },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  name="problem_solving"
                  label={
                    <>
                      <Star fontSize="small" sx={{ marginRight: '5px' }} /> Problem Solving (0-100)
                    </>
                  }
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  type="number"
                  InputProps={{
                    inputProps: { min: 0, max: 100 },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  name="teamwork"
                  label={
                    <>
                      <PeopleAlt fontSize="small" sx={{ marginRight: '5px' }} /> Teamwork (0-100)
                    </>
                  }
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  type="number"
                  InputProps={{
                    inputProps: { min: 0, max: 100 },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  name="time_management"
                  label={
                    <>
                      <ThumbUp fontSize="small" sx={{ marginRight: '5px' }} /> Time Management (0-100)
                    </>
                  }
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  type="number"
                  InputProps={{
                    inputProps: { min: 0, max: 100 },
                  }}
                />
              </Grid>
            </Grid>

            {/* Satisfaction Section */}
            <Typography variant="h6" sx={{ marginTop: '20px', marginBottom: '15px', fontFamily: 'Montserrat' }}>
              <ThumbUp fontSize="large" sx={{ marginRight: '10px' }} /> Satisfaction
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Field
                  name="workplaceSatisfaction"
                  label={
                    <>
                      <ThumbUp fontSize="small" sx={{ marginRight: '5px' }} /> Workplace Satisfaction (0-100)
                    </>
                  }
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  type="number"
                  InputProps={{
                    inputProps: { min: 0, max: 100 },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  name="colleagueSatisfaction"
                  label={
                    <>
                      <ThumbUp fontSize="small" sx={{ marginRight: '5px' }} /> Colleague Satisfaction (0-100)
                    </>
                  }
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  type="number"
                  InputProps={{
                    inputProps: { min: 0, max: 100 },
                  }}
                />
              </Grid>
            </Grid>

            {/* Feedback Section */}
            <Typography variant="h6" sx={{ marginTop: '20px', marginBottom: '15px', fontFamily: 'Montserrat' }}>
              <Chat fontSize="large" sx={{ marginRight: '10px' }} /> Feedback
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="feedback"
                  label="Feedback"
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>

            <Box mt={3}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
            </Box>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeSurvey;
