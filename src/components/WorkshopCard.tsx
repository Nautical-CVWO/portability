import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button, IconButton, Grid, Paper } from '@mui/material';
import { Event, Star, Delete } from "@mui/icons-material";
import { participateWorkshop, cancelParticipation, deleteWorkshop } from "../backend/command";
import { Box } from '@mui/system';

interface WorkshopCardProps {
  uid: string;
  workshopName: string;
  workshopDate: string;
  workshopPoint: number;
  isParticipating: Promise<boolean>;
  isAdmin: boolean;
}

const cardStyle = {
  margin: '16px',
  borderRadius: '8px',
  width: '100%'
};

const contentStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '16px',
  borderRadius: '0 0 8px 8px',
};

const iconStyle = {
  marginRight: '8px',
  verticalAlign: 'middle',
};

const buttonStyle = {
  fontWeight: 'bold',
  fontSize: '12px',
  padding: '8px 16px',
};

const WorkshopCard: React.FC<WorkshopCardProps> = ({
  uid,
  workshopName,
  workshopDate,
  workshopPoint,
  isParticipating: initialIsParticipating,
  isAdmin
}) => {
  const [isParticipating, setIsParticipating] = useState<boolean | null>(null);

  useEffect(() => {
    // Resolve the promise and set the state when the component mounts
    initialIsParticipating.then(result => {
      setIsParticipating(result);
    });
  }, [initialIsParticipating]);

  const handleParticipateClick = () => {
    // Handle participate click here, set isParticipating to true, and call your function
    setIsParticipating(true);
    participateWorkshop(uid, workshopName, workshopPoint);
  };


  const handleCancelClick = () => {
    setIsParticipating(false);
    cancelParticipation(uid, workshopName, workshopPoint);
  };

  const handleDeleteClick = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete workshop?");
    if (isConfirmed) {
      deleteWorkshop(workshopName, workshopPoint);
    }
  };

  return (
    <Card elevation={3} style={cardStyle}>
      <Paper style={contentStyle}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={10} justifyContent="space-between" alignItems="center">
            <Grid container sx={{ display: 'flex', flexDirection: 'row', alignItems: ' flex-start', justifyContent:'flex-start' }}>
              <Grid item xs={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '8px' }}>
                <Typography variant="h6" style={{ fontFamily: 'Montserrat', fontWeight: 'bold', marginBottom: '8px' }}>
                  {workshopName}
                </Typography>
                <Box style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <Event style={iconStyle} />
                  <Typography variant='h6' style={{ fontFamily: 'Montserrat', fontSize: '0.9rem', color: 'lightgray' }}>
                    Date: {workshopDate}
                  </Typography>
                </Box>
              </Grid>
              <Box mx={3}/>
              <Grid item xs={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Star style={{ ...iconStyle, color: 'white' }} />
                  <Typography variant='h6' style={{ fontFamily: 'Montserrat', fontWeight: 'bold', color: 'white' }}>
                    Points: {workshopPoint}
                  </Typography>
                </div>
                
              </Grid>
              <Box mx={3}/>
              <Grid item xs={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '8px' }}>
              {isParticipating ?
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Typography variant='h6' style={{ fontFamily: 'Montserrat', fontWeight: 'bold', color: 'white' }}>
                      Status : Participating
                    </Typography>
                  </div>
                  :
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Typography variant='h6' style={{ fontFamily: 'Montserrat', fontWeight: 'bold', color: 'white' }}>
                      Status : Not Participating
                    </Typography>
                  </div>}
                
              </Grid>
              
            </Grid>





          </Grid>
          <Grid item xs={2} >
            {/* Delete icon */}
            {isAdmin === null ? (
              <Typography>Loading...</Typography>
            ) : isAdmin ? (
              <>
                <IconButton sx={{ fontSize: '20px', cursor: 'pointer', color: 'red' }} onClick={() => { handleDeleteClick() }}>
                  <Delete />
                </IconButton>
              </>
            ) : (
              <> </>
            )}
            {/* Participate/Cancel button */}
            {isParticipating === null ? (
              <Typography>Loading...</Typography>
            ) : !isParticipating ? (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  ...buttonStyle, 
                  width:'60%',
                  backgroundColor: '#4CAF50',
                  '&:hover': { backgroundColor: '#45A049' },
                }}
                onClick={handleParticipateClick}
              >
                Participate
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  ...buttonStyle,
                  width:'60%',
                  backgroundColor: '#f44336',
                  '&:hover': { backgroundColor: '#d32f2f' },
                }}
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Card>
  );
};

export default WorkshopCard;
