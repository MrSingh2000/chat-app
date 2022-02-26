import React, { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import appContext from '../context/appContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import chatIcon from "../assets/chat.png";

export default function Statuswindow(props) {
    let {
        theme,
    } = useContext(appContext);

    const { image } = props;


    return <div>
        <ThemeProvider theme={theme}>
            {/* DESKTOP VERSION OF CHAT WINDOW */}
            <Box sx={{
                position: 'relative',
                width: {
                    mobile: "100vw",
                    tablet: "50vw",
                    laptop: "60vw",
                },
                display: {
                    mobile: "none",
                    tablet: "block"
                }, height: '85vh',
                backgroundColor: '#3B8AD9'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {image ? (<Box style={{
                        backgroundColor: 'white',
                        height: '85vh',
                        width: "100%",
                        backgroundImage: `url(${image})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain'
                    }}>{}</Box>) : null}
                </div>
            </Box>
        </ThemeProvider>
    </div>;
}
