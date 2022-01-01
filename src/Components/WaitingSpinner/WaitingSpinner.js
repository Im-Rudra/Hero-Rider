import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

const WaitingSpinner = ({ loadingDependency }) => (
  <>
    {loadingDependency && (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 5000 }} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    )}
  </>
);

export default WaitingSpinner;
