import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleSignup = () => {
    // Add your signup logic here
    // For simplicity, let's just log the credentials for now
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        // Check email format using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(value);
        setEmailError(!value || !emailRegex.test(value));
        break;
      case 'password':
        // Check password length (minimum 8 characters)
        setPassword(value);
        setPasswordError(value.length > 0 && value.length < 8);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        setConfirmPasswordError(value !== password);
        break;
      default:
        break;
    }

    setIsButtonDisabled(
      !(username && !emailError && !passwordError && !confirmPasswordError)
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      <Box
        border="1px solid #ccc"
        borderRadius="8px"
        padding="20px"
        maxWidth="400px"
        width="100%"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
      >
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          variant="outlined"
          name="username"
          value={username}
          onChange={handleInputChange}
          error={!username}
          helperText={!username ? 'Please enter a username' : ''}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          name="email"
          value={email}
          onChange={handleInputChange}
          error={emailError}
          helperText={emailError ? 'Invalid email format' : ''}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          variant="outlined"
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          error={passwordError}
          helperText={
            passwordError
              ? 'Password must have at least 8 characters'
              : ''
          }
        />
        <TextField
          label="Confirm Password"
          fullWidth
          margin="normal"
          variant="outlined"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleInputChange}
          error={confirmPasswordError}
          helperText={
            confirmPasswordError
              ? 'Passwords do not match'
              : ''
          }
        />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          style={{ marginTop: '20px' }}
          onClick={handleSignup}
          disabled={isButtonDisabled}
        >
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
