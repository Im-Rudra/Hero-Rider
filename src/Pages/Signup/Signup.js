/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

const Signup = () => {
  const { passwordSignup } = useAuth();
  const [formData, setFormData] = useState({});
  const [type, setType] = useState('');
  const [imgs, setImgs] = useState({});
  const { register, handleSubmit, reset } = useForm();

  const imgHandler = (e) => {
    const { name, files } = e.target;
    setImgs((prev) => ({ ...prev, [name]: files[0] }));
  };

  const onSubmit = (data) => {
    if (data.password !== data.password2) return;
    const temp = { ...data, role: type, ...imgs };
    setFormData(temp);
    passwordSignup(temp);
    reset();
  };
  console.log(formData);

  const signupTypes = ['rider', 'learner'];

  const inputFields = {
    rider: [
      { fieldType: 'input', name: 'name', placeholder: 'Full Name', type: 'text', required: true },
      { fieldType: 'input', name: 'email', placeholder: 'Email', type: 'email', required: true },
      { fieldType: 'input', name: 'age', placeholder: 'Age', type: 'number', required: true },
      { fieldType: 'input', name: 'address', placeholder: 'Address', type: 'text', required: true },
      {
        fieldType: 'input',
        name: 'phone',
        placeholder: 'Phone Number',
        type: 'tel',
        required: true
      },
      { fieldType: 'input', name: 'area', placeholder: 'Area', type: 'text', required: true },
      {
        fieldType: 'input',
        name: 'carName',
        placeholder: 'Car Name',
        type: 'text',
        required: true
      },
      {
        fieldType: 'input',
        name: 'carModel',
        placeholder: 'Car Model',
        type: 'text',
        required: true
      },
      {
        fieldType: 'input',
        name: 'carNumber',
        placeholder: 'Car Number',
        type: 'text',
        required: true
      },
      {
        fieldType: 'input',
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        required: true
      },
      {
        fieldType: 'input',
        name: 'password2',
        placeholder: 'Password',
        type: 'password',
        required: true
      },
      {
        fieldType: 'select',
        name: 'vehicleType',
        placeholder: 'Vehicle Type',
        type: 'select',
        required: true
      },
      {
        fieldType: 'image',
        name: 'DLPic',
        placeholder: 'Driving Lisence',
        type: 'file',
        required: true
      },
      { fieldType: 'image', name: 'NidPic', placeholder: 'Nid', type: 'file', required: true },
      {
        fieldType: 'image',
        name: 'profilePic',
        placeholder: 'Profile Picture',
        type: 'file',
        required: true
      }
    ],
    learner: [
      { fieldType: 'input', name: 'name', placeholder: 'Full Name', type: 'text', required: true },
      { fieldType: 'input', name: 'email', placeholder: 'Email', type: 'email', required: true },
      { fieldType: 'input', name: 'age', placeholder: 'Age', type: 'number', required: true },
      { fieldType: 'input', name: 'address', placeholder: 'Address', type: 'text', required: true },
      {
        fieldType: 'input',
        name: 'phone',
        placeholder: 'Phone Number',
        type: 'tel',
        required: true
      },
      {
        fieldType: 'input',
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        required: true
      },
      {
        fieldType: 'input',
        name: 'password2',
        placeholder: 'Password',
        type: 'password',
        required: true
      },
      {
        fieldType: 'select',
        name: 'vehicleType',
        placeholder: 'Vehicle Type',
        type: 'select',
        required: true
      },
      { fieldType: 'image', name: 'NidPic', placeholder: 'Nid', type: 'file', required: true },
      {
        fieldType: 'image',
        name: 'profilePic',
        placeholder: 'Profile Picture',
        type: 'file',
        required: true
      }
    ]
  };

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
          Signup
        </Typography>

        <Typography>Signup as a: </Typography>
        <ButtonGroup variant="outlined" aria-label="outlined primary button group" sx={{ mb: 2 }}>
          {signupTypes.map((el) => (
            <Button variant={type === el ? 'contained' : 'outlined'} onClick={() => setType(el)}>
              {el}
            </Button>
          ))}
        </ButtonGroup>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          {inputFields[type]?.map((field) =>
            // eslint-disable-next-line no-nested-ternary
            field.fieldType === 'input' ? (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register(field.name)}
                key={field.name}
                type={field.type}
                id={`outlined-${field.name}`}
                label={field.placeholder}
                variant="outlined"
                sx={{ width: '47%', mx: 1, mb: 2 }}
                required={field.required}
              />
            ) : // eslint-disable-next-line no-nested-ternary
            field.fieldType === 'image' ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label htmlFor="contained-button-file" key={field.name}>
                <Typography>{field.placeholder}</Typography>
                <Input
                  label={field.placeholder}
                  onChange={imgHandler}
                  name={field.name}
                  accept="image/*"
                  type="file"
                  required={field.required}
                  sx={{ mb: 2, width: '100%' }}
                />
              </label>
            ) : field.fieldType === 'select' ? (
              <FormControl sx={{ width: '47%', mx: 1 }}>
                <InputLabel id="demo-simple-select-label">{field.placeholder}</InputLabel>
                <Select
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register(field.name)}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={field.placeholder}
                >
                  <MenuItem value="car">Car</MenuItem>
                  <MenuItem value="bike">Bike</MenuItem>
                </Select>
              </FormControl>
            ) : null
          )}
          {type && (
            <Button type="submit" variant="contained" sx={{ width: '100%' }}>
              Signup
            </Button>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
