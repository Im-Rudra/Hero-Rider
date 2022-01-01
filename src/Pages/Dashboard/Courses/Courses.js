import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import useAuth from '../../../hooks/useAuth';

const Courses = () => {
  const { dbUserData } = useAuth();
  return (
    <div>
      {dbUserData?.role === 'rider' && (
        <Typography variant="h3">No Courses availble for riders</Typography>
      )}
      {dbUserData?.role === 'learner' && (
        <div>
          <Card sx={{ width: 275, m: 3 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Drive Safe
              </Typography>
              <Typography variant="h5" component="div">
                Car Course
              </Typography>
              <Typography variant="body2">Price: $200</Typography>
              <Typography variant="body2">
                By this course you will learn how to drive a car safely
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Buy this course</Button>
            </CardActions>
          </Card>
          <Card sx={{ width: 275, m: 3 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Ride Safe
              </Typography>
              <Typography variant="h5" component="div">
                Bike Riding Course
              </Typography>
              <Typography variant="body2">Price: $100</Typography>
              <Typography variant="body2">
                By this course you will learn how to Ride a bike safely
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Buy this course</Button>
            </CardActions>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Courses;
