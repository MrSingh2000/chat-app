import React, { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import appContext from '../../context/appContext';
import Alert from '@mui/material/Alert';

export default function Login() {
  const { setAuthToken, setUserId, error, setError, errorType, setErrorType } = useContext(appContext);
  const navigate = useNavigate();
  const [details, setDetails] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  }

  const handleSubmit = () => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_HOST}/api/auth/login`,
      data: details
    })
      .then((res) => {
        setAuthToken(res.data.authToken);
        setUserId(details.username);
        localStorage.setItem("authToken", res.data.authToken);
        localStorage.setItem("userId", details.username);
        setDetails({ username: "", password: "" });
        // setError("Login Successful!");
        // setErrorType("success");
        // setTimeout(() => {
        //   setError();
        //   console.log("redirecting")
        // }, 1000);
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.error);
        setErrorType("error");
        setTimeout(() => {
          setError();
        }, 3000);
      })
  }

  return (<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '3rem' }}>
    {error && (<Alert
      sx={{ position: 'absolute', top: '2px' }}
      variant="filled"
      severity={errorType}>
      {error}
    </Alert>)}
    <Paper elevation={3} sx={{
      width: '18rem',
      // backgroundColor: 'red',
      p: 2
    }}>
      <Typography component="div">
        <Box sx={{
          textAlign: 'center'
        }}>
          <Box sx={{
            textTransform: 'uppercase',
            m: 1,
            fontWeight: 'bold',
            fontSize: 20,
            fontFamily: 'Monospace'
          }}>
            Login
          </Box>
          <Box sx={{
          }}>
            <div>
              <TextField
                label="Username"
                name="username"
                value={details.username}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </div>
            <div>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={details.password}
                onChange={handleChange}
              />
            </div>
            <Button onClick={handleSubmit} sx={{ mt: 2, mb: 2 }} variant="contained" endIcon={<PublishOutlinedIcon />}>
              Submit
            </Button>
          </Box>
          <Link to="/signup">
            Don't have an Account?
          </Link>
        </Box>
      </Typography>
    </Paper>
  </div>);
}
