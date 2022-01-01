import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const { passwordLogin } = useAuth();
  const [formData, setFormData] = useState({});
  const formHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    console.log(formData);
    passwordLogin(formData.email, formData.password);
    setFormData({});
    e.target.reset();
  };
  // console.log(formData);
  return (
    <Box
      className="getinto-page"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        bgcolor: '#eee'
      }}
    >
      <Box
        sx={{
          width: '700px',
          bgcolor: 'white',
          p: 3,
          boxSizing: 'boder-box',
          borderRadius: '8px'
        }}
      >
        <Typography variant="h4" textAlign="center" mb={2}>
          Login
        </Typography>
        <form action="" onSubmit={handleSubmit}>
          <TextField
            name="email"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ width: '100%', my: 2 }}
            onChange={formHandler}
            required
          />
          <TextField
            name="password"
            id="outlined-basic2"
            label="Password"
            variant="outlined"
            sx={{ width: '100%', my: 2 }}
            onChange={formHandler}
            required
          />
          <Button type="submit" variant="contained" sx={{ width: '100%' }}>
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
