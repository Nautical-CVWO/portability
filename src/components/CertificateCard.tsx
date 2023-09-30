import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button, Grid, IconButton, Box } from '@mui/material';
import { Event, Star, Delete } from "@mui/icons-material";
import { handleDeleteCertificate } from "../backend/command";

interface CertificateCardProps {
  url: string,
  index: number,
  uid: string
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  url,
  index,
  uid
}) => {
    const handleDelete = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete certificate?");
        if (isConfirmed) {
            handleDeleteCertificate(uid, url);
        }
    }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ backgroundColor: '#f3f3f3', padding: '20px', borderRadius: '10px' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Star sx={{ marginRight: '5px' }} />
            <Typography variant="h6" sx={{ fontFamily: 'Montserrat' }}>
              Certificate {index}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Event sx={{ marginRight: '5px' }} />
            <Typography variant="body2" color="textSecondary">
              URL:
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {url}
          </Typography>
          <Button variant="outlined" color="primary" href={url} target="_blank" sx={{ marginTop: '10px' }}>
            View Certificate
          </Button>
          <IconButton sx={{ fontSize: '20px', cursor: 'pointer', color: 'red' }} onClick={() => { handleDelete() }}>
            <Delete />
          </IconButton>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CertificateCard;
