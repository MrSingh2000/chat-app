import * as React from 'react';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from 'react-router-dom';
import appContext from '../../context/appContext';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import github from "../../assets/github.png";
import instagram from "../../assets/instagram.png";
import gmail from "../../assets/gmail.png";
import linkedin from "../../assets/linkedin.png";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DevicesIcon from '@mui/icons-material/Devices';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

function About() {
    const {
        userId,
        profileDetails,
        theme,
        handleProfilePic
    } = React.useContext(appContext);
    let navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            {/* NAV BAR */}
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => { navigate(-1) }}
                        >
                            <ArrowBackOutlinedIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            {/* CONTENT BLOCK */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
                textAlign: 'center',
            }}>
                <Paper elevation={4} sx={{
                    width: {
                        mobile: "90vw",
                        tablet: "32rem",
                    },
                    padding: '10px',
                    height: '80vh',
                    backgroundColor: '#85BEF7',
                }}>
                    <Typography
                        variant="h4"
                    >
                        About
                    </Typography>
                    <Divider variant="middle" />
                    <p style={{ textAlign: 'left' }}>
                        <h3 style={{ marginLeft: '20px' }}>About Application <SettingsApplicationsIcon sx={{ color: 'white', position: 'relative', top: '5px' }} /></h3>
                        <p style={{ marginLeft: '20px' }}>
                            Welcome to My Project! <br /> This is a Web Chat Application based entirely on MERN stack. I tried to integrate
                            various feature in the application and some of those are, adding profile picture, saving contacts in the list,
                            uploading your own status in between other users and also the option to delete it, and many more little things i have
                            done in the app.
                            <br />
                            Explore the features and Enjoy!
                        </p>
                    </p>
                    <p style={{ textAlign: 'left' }}>
                        <h3 style={{ marginLeft: '20px' }}>Tech Stack Used <DevicesIcon sx={{ color: 'white', position: 'relative', top: '5px' }} /></h3>
                        <ul>
                            <li>MERN Stack</li>
                            <li>Material UI</li>
                            <li>Axios</li>
                            <li>SocketIO</li>
                            <li>Azure Cloud Storage</li>
                        </ul>
                    </p>
                    <p style={{ textAlign: 'left' }}>
                        <h3 style={{ marginLeft: '20px' }}>
                            I would Love to hear from you! <FavoriteIcon sx={{ color: 'red', position: 'relative', top: '7px' }} />
                        </h3>
                        <ul style={{ listStyle: "none", display: 'flex', justifyContent: 'space-evenly', marginRight: '40px' }}>
                            <li>
                                <a target="_blank" href="https://www.linkedin.com/in/anshuman-singh-856991201/"><img src={linkedin} alt="linkedin" height="50px" referrerPolicy="no-referrer" /></a>
                            </li>
                            <li>
                                <a target="_blank" href="https://github.com/MrSingh2000"><img src={github} alt="linkedin" height="50px" referrerPolicy="no-referrer" /></a>
                            </li>
                            <li>
                                <a target="_blank" href="https://www.instagram.com/mr_singh2000/"><img src={instagram} alt="linkedin" height="50px" referrerPolicy="no-referrer" /></a>
                            </li>
                            <li>
                                <a target="_blank" href="mailto:www.anshu2000@gmail.com"><img src={gmail} alt="linkedin" height="50px" referrerPolicy="no-referrer" /></a>
                            </li>
                        </ul>
                    </p>
                </Paper>
            </Box>
        </ThemeProvider>
    )
}

export default About