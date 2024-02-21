import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate  } from 'react-router-dom';
import axios from "axios";
const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  var navigate = useNavigate ()
  const handleLogin = async () => {
    // Add your authentication logic here
    // For simplicity, let's just log the credentials for now
    const loginres = await axios.post(
      "http://localhost:3000/admin/login",{email,password}
    )
      if(loginres.data.token) {
        localStorage.setItem('token',loginres.data.token)
        localStorage.setItem('user',JSON.stringify(loginres.data.user))
        navigate('/')
      };

  
  
  }
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setemail(value);
    } else if (name === 'password') {
      setPassword(value);
    }

    // Check if both email and password are filled
    setIsButtonDisabled(!(email && password));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="85%"
    >
      <Typography variant="h4" gutterBottom>
      Login
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
          label="email"
          fullWidth
          margin="normal"
          variant="outlined"
          name="email"
          value={email}
          onChange={handleInputChange}
          error={!email}
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
          error={!password}
        />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          style={{ marginTop: '20px' }}
          onClick={handleLogin}
          disabled={isButtonDisabled}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
