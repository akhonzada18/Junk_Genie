import React from 'react';
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';

const Profile = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    contact: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Box ml={5}>
      <Header title="Admin Profile" subtitle="Manage Profile" />

      

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <Box onSubmit={handleSubmit} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            
            <Grid container spacing={4} maxWidth={800} > 
              <Grid item xs={12}>
                <Grid display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                <Avatar sx={{ width: 100, height: 100, margin: 'auto' }}></Avatar>
                <Box>
                <input type="file" accept="image/*"  />

                </Box>

                </Grid>
              

              </Grid>

<Grid item xs={12} sm={6}>
<TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: 'span 2' }}
              />
</Grid>

       <Grid item xs={12} sm={6}>
       <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: 'span 2' }}
              />
        </Grid>   
        <Grid item xs={12} sm={6}>
        <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 4' }}
              />
          </Grid>   
            
        <Grid item xs={12} sm={6}>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: 'span 4' }}
              />
        </Grid>
<Grid item xs={12} sm={6}>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: 'span 4' }}
              />
</Grid>
<Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: 'span 4' }}
              />
</Grid>
<Grid xs={12} item display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Button type="submit" color="secondary" variant="contained">
                Save Changes
              </Button>
            </Grid>
            </Grid>
            
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Profile;
