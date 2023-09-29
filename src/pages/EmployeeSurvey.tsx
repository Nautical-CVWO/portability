import React, { useState } from 'react';
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
  Slider,
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
  writeFeedbackData
} from '../backend/command';
import SimpleTextField from '../components/SimpleTextField';
import ProgressSlider from '../components/ProgressSlider';
import { useNavigate } from 'react-router-dom';


const EmployeeSurvey: React.FC = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
  return (
    <Formik
      initialValues={EmployeeSurveyFormInitialValues}
      onSubmit={(values) => {
        // Handle form submission here
        console.log(values);
        setIsSubmitting(true);
        writeEmployeeData(values.id, values.name, values.gender, values.education, values.position, values.performance);
        writeSkillsData(values.id, values.communication, values.creativity, values.problem_solving, values.teamwork, values.time_management);
        writeFeedbackData(values.id, values.feedback);
        setTimeout(() => {
            setIsSubmitting(false); 
        }, 2000);
        navigate('/');
        
        
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
            <Typography variant="h6" sx={{ marginBottom: '15px', fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AccountCircle fontSize="large" sx={{ marginRight: '10px' }} />
              <span>Employee Information</span>
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <Field
                  render={() => (
                    <SimpleTextField 
                        name="name"
                        label="Employee Name"
                        disabled={isSubmitting}
                    />
                  )} />
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
                  )} />
              </Grid>
              <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <EmojiPeople fontSize="small" sx={{ marginRight: '5px' }} /> Gender
                  </div>
                </InputLabel>
                <Field name="gender" as={Select} label={
                  <div style={{ display: 'flex', textAlign: 'left' }}>
                    <EmojiPeople fontSize="small" sx={{ marginRight: '5px' }} /> Gender
                  </div>
                }
                disabled={isSubmitting}>
                  <MenuItem value="male" style={{ display: 'flex', textAlign: 'left' }}>Male</MenuItem>
                  <MenuItem value="female" style={{ textAlign: 'left' }}>Female</MenuItem>
                  <MenuItem value="other" style={{ textAlign: 'left' }}>Other</MenuItem>
                </Field>
              </FormControl>
            </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  render={() => (
                    <SimpleTextField 
                        name="education"
                        label={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <School fontSize="small" sx={{ marginRight: '5px' }} /> Education
                            </div>
                        }
                        disabled={isSubmitting}
                    />
                  )} />
              </Grid>
              <Grid item xs={6} md={6}>
                <Field
                  render={() => (
                    <SimpleTextField 
                        name="position"
                        label={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <SupervisorAccount fontSize="small" sx={{ marginRight: '5px' }} />
                              Position
                            </div>
                        }
                        disabled={isSubmitting}
                    />
                  )} />
              </Grid>
              {/* label={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Star fontSize="small" sx={{ marginRight: '5px' }} /> Performance (0-100)
                    </div>
                  }    */}
              <Grid item xs={6} md={6}>
                <Field
                  render={() => (
                    <ProgressSlider 
                        name="performance"
                        min={0}
                        max={100}
                        defaultValue={0}
                        header={
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Star fontSize="small" sx={{ marginRight: '5px' }} />
                              Employee performance (0-100)
                            </div>}
                        disabled={isSubmitting}
                    />
                  )} />
              </Grid>
            </Grid>

            {/* Skills Section */}
            <Typography variant="h6" sx={{ marginTop: '20px', marginBottom: '15px', fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CardMembership fontSize="large" sx={{ marginRight: '10px' }} /> Skills
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
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Chat fontSize="small" sx={{ marginRight: '5px' }} />
                              Communication (0-100)
                            </div>}
                        disabled={isSubmitting}
                  />
                )}/>
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
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Star fontSize="small" sx={{ marginRight: '5px' }} />
                            Creativity (0-100)
                          </div>}
                    disabled={isSubmitting}
                />
              )}/>
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
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Star fontSize="small" sx={{ marginRight: '5px' }} />
                            Problem Solving (0-100)
                          </div>}
                    disabled={isSubmitting}
                />
              )}/>
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
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Chat fontSize="small" sx={{ marginRight: '5px' }} />
                            Teamwork (0-100)
                          </div>}
                    disabled={isSubmitting}
                />
              )}/>
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
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Chat fontSize="small" sx={{ marginRight: '5px' }} />
                            Time Management (0-100)
                          </div>}
                    disabled={isSubmitting}
                />
              )}/>
              </Grid>
            </Grid>

            {/* Feedback Section */}
            <Typography variant="h6" sx={{ marginTop: '20px', marginBottom: '15px', fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Chat fontSize="large" sx={{ marginRight: '10px' }} /> Feedback
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SimpleTextField
                  name="feedback"
                  label="Feedback"
                  rows={4}
                  disabled={isSubmitting}
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
