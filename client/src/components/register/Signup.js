import React, { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import { Link, useNavigate } from "react-router-dom";
import appContext from '../../context/appContext';
import axios from "axios";

export default function Signup() {
  const { setUserId, setAuthToken } = useContext(appContext);
  const navigate = useNavigate();
  const [details, setDetails] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  }
  const handleSubmit = () => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_HOST}/api/auth/signup`,
      data: details
    })
      .then((res) => {
        setAuthToken(res.data.authToken);
        setUserId(details.username);
        localStorage.setItem("authToken", res.data.authToken);
        localStorage.setItem("userId", details.username);
        setDetails({username: "", password: ""});
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem' }}>
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
            Register
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
          <Link to="/login">
            Already have an Account?
          </Link>
        </Box>
      </Typography>
    </Paper>
  </div>);
}
