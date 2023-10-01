import React, { useEffect, useState } from 'react'
import Header from './Header';
import { Container, Typography, Box, Grid, Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik, FormikProps } from 'formik';
import SimpleTextField from '../components/SimpleTextField';
import { WorkshopInitialValues } from '../types/EmployeeSurveyFormData';
import { readCurrentUserData, readUserData, writeWorkshopData, checkUserIsParticipating } from '../backend/command';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import CustomButton from '../components/CustomButton';
import { db } from '../backend/firebase';
import { ref, onValue } from "firebase/database";
import WorkshopCard from "../components/WorkshopCard";

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
  const [workshopList, setWorkshopList] = useState([]);

  const handleSetUser = (newUser: User | undefined) => {
    setUser(newUser);
  };
  useEffect(() => {
    readCurrentUserData()
      .then((res) => {
        readUserData(res).then((result) => {
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

    const fetchWorkshops = () => {
      const workshopDataRef = ref(db, 'workshops/');
      const unsubscribe = onValue(workshopDataRef, (snapshot) => {
        if (snapshot && snapshot.exists()) {
          const data = snapshot.val();
          setWorkshopList(data ? Object.values(data) : []);
        } else {
          setWorkshopList([]);
        }
      });
      return () => {
        unsubscribe();
      }
    }
    fetchWorkshops();
  }, [])


  return (
    <Container disableGutters={true} maxWidth={false} sx={{ backgroundColor: '#161616', maxWith: '100%', width: "100%", minHeight: '150vh', padding: '0px', margin: '0px' }}>
      <Header user={user} setUser={handleSetUser} />
      <Box sx={{ padding: '30px', paddingLeft: '60px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant="h4" sx={{ marginBottom: '15px', fontFamily: 'Montserrat', display: 'flex', alignItems: 'flex-start', textAlign: 'left', color: 'white' }}>
          Workshop Lists
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: '15px', fontFamily: 'Montserrat', display: 'flex', alignItems: 'flex-start', textAlign: 'left', color: 'white' }}>
          Register these workshops to get additional 50 <Inventory2RoundedIcon sx={{ marginLeft: '5px' }} />.
          Note that not attending these workshops after signing up will not award any points
        </Typography>
      </Box>


      {user?.isAdmin ? (<Box>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h6" sx={{ marginBottom: '15px', fontFamily: 'Montserrat', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', color: 'black' }}>
              HR Admin Form
            </Typography>
            <Formik
              initialValues={WorkshopInitialValues}
              onSubmit={(values) => {
                // Handle form submission here
                setIsSubmitting(true);
                //writeLoginData(values.certUrl);
                writeWorkshopData(values.workshopName, values.workshopPoint, values.workshopDate, user.uid);
                setTimeout(() => {
                  setIsSubmitting(false);
                }, 2000);
                navigate('/');
              }}
            >
              {formikProps => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Field
                        type="text"
                        as={SimpleTextField}
                        name="workshopName"
                        label="Workshop Name"
                        disabled={formikProps.isSubmitting}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <SimpleTextField
                        name="workshopDate"
                        label="Workshop Date (DD/MM/YYYY)"
                        disabled={formikProps.isSubmitting}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <SimpleTextField
                        name="workshopPoint"
                        label="Workshop Points"
                        type="number"
                        disabled={formikProps.isSubmitting}
                      />
                    </Grid>
                  </Grid>
                  <Box mt={3}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={formikProps.isSubmitting}
                    >
                      {formikProps.isSubmitting ? 'Submitting...' : 'Add Workshop'}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Box>) : <>
      </>}
      <Box sx={{ padding: '30px', padding: '60px', width:'100%', height: 'min-content', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {workshopList.length > 0 ? (
          workshopList.map((item: { workshopName: string, workshopDate: string, workshopPoint: number }, index) => {
            const isParticipating = user && user.uid ? checkUserIsParticipating(user.uid, item.workshopName) : Promise.resolve(false);
            const uid = user?.uid || '';
            const isAdmin = user?.isAdmin || false;
            return (
              <WorkshopCard
                uid={uid}
                workshopName={item.workshopName}
                workshopDate={item.workshopDate}
                workshopPoint={item.workshopPoint}
                isParticipating={isParticipating}
                isAdmin={isAdmin}
              />
            )
          })
        ) : <></>}
      </Box>
      

    </Container>
  )
}

export default Workshop;