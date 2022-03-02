import React, { useContext } from 'react';
import appContext from '../context/appContext';
import AllStatus from './AllStatus';
import StatusWindow from './Statuswindow';
import Box from "@mui/material/Box";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import axios from "axios";
import nostatus from "../assets/nostatus.png";
import loader from "../assets/loader.gif";

function Status() {
    const {
        theme,
        addStatus,
        getStatus,
        allStatus,
        loading,
        setLoading
    } = useContext(appContext);
    let navigate = useNavigate();

    const [selectedImage, setSelectedImage] = React.useState("");

    React.useEffect(() => {
        getStatus();
    }, []);

    return loading ? (<div style={{
        width: "100vw",
        height: "100vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <img src={loader} alt="Loading..." />
    </div>) : (
        <ThemeProvider theme={theme}>
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
                        <div>
                            <span style={{ marginLeft: '20px', marginRight: '5px' }}>Add My Status</span>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <label>
                                    <input onChange={(e) => {
                                        addStatus(e.target.files[0]);
                                    }} type="file" accept="image/png, image/gif, image/jpeg" style={{ display: "none" }} />
                                    <AddCircleOutlinedIcon />
                                </label>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
            {(allStatus.length === 0 || allStatus[0].userStatus.length === 0) ? (<Box sx={{
                ml: '5vw',
                mt: '10px'
            }}>
                <div style={{ backgroundColor: '#BCCEFB', width: '90vw', height: '100vh' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ marginTop: '100px' }}>
                            <div style={{ fontSize: '20px', marginBottom: '10px' }}>
                                <span style={{ fontWeight: 'bolder' }}>Nothing</span> to See here! <span style={{ fontWeight: 'bolder', color: 'white' }}>Add</span> your Status Now!
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <img src={nostatus} alt="ChatIcon" height="150px" />
                            </div>
                        </div>
                    </div>
                </div>
            </Box>) :
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: "space-between", mt: 2, mx: 2 }}>
                        <div>
                            <AllStatus setSelectedImage={setSelectedImage} />
                        </div>
                        <div>
                            <StatusWindow image={selectedImage} />
                        </div>
                    </Box>
                </Box>}
        </ThemeProvider>
    );
}

export default Status;
