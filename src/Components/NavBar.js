import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function NavBar() {
  const { userData, logout } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hero Rider
          </Typography>
          {userData.email && (
            <Link to="/dashboard">
              <Button color="inherit">Dashboard</Button>
            </Link>
          )}
          {!userData?.email ? (
            <>
              <Link to="/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/signup">
                <Button color="inherit">Signup</Button>
              </Link>
            </>
          ) : (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
