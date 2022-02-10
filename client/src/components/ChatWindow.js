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


export default function ChatWindow() {
    let {
        theme,
        sendMessage,
        chat,
        userId,
        clientId,
        setClientId
    } = useContext(appContext);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const triggerSendMessage = () => {
        if (message === "") {
            return;
        }
        sendMessage(message);
        setMessage("");
    }

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
                }, height: '85vh', backgroundColor: 'red'
            }}>
                <Paper >
                    <div className="scrollBar" style={{ overflowY: 'scroll' }}>
                        <div style={{ backgroundColor: 'white', margin: '2px' }}>
                            {clientId}
                        </div>
                        {chat.map((payload, index) => {
                            return (
                                <div key={index} style={{
                                    width: "100%",
                                    display: 'flex',
                                    justifyContent: `${payload.from !== userId ? 'left' : 'right'}`,
                                }}>
                                    <Paper sx={{
                                        minHeight: '10px',
                                        maxWidth: '25rem',
                                        p: '2px',
                                        textAlign: 'left',
                                        mx: '5px',
                                        my: '3px'
                                    }}>
                                        {payload.message}
                                    </Paper>
                                </div>
                            )
                        })}
                    </div>
                    <div className="chat-type">
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Multiline"
                            multiline
                            maxRows={4}
                            value={message}
                            onChange={handleChange}
                            sx={{ width: "80%", ml: 2 }}
                        />
                        <Button onClick={triggerSendMessage} sx={{ mr: 2 }} variant="contained" endIcon={<SendIcon />}>
                            Send
                        </Button>
                    </div>
                </Paper>
            </Box>

            {/* MOBILE VERSION OF CHAT WINDOW */}
            <Box sx={{
                position: 'relative',
                width: {
                    mobile: "90vw",
                    tablet: "50vw",
                    laptop: "60vw",
                },
                display: {
                    mobile: `${clientId ? "block": "none"}`,
                    tablet: "none"
                }, height: '85vh', backgroundColor: 'red'
            }}>
                <Paper>
                    <Box sx={{ flexGrow: 1, maxHeight: '2rem', backgroundColor: 'pink' }}>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            position: 'sticky',
                            justifyContent: 'space-between'
                        }} >
                            {/* <div style={{padding: '1px', backgroundColor: 'pink'}}> */}
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ marginLeft: '1px', position: 'relative', marginTop: '-5px' }}
                                onClick={() => { setClientId("") }}
                            >
                                <ArrowBackOutlinedIcon />
                            </IconButton>
                            <div style={{
                                marginTop: '7px',
                                marginRight: '1rem',
                                fontWeight: 'bolder'
                            }}>
                                {clientId}
                            </div>
                            {/* </div> */}
                        </div>
                    </Box>
                    <div className="scrollBar" style={{ overflowY: 'scroll' }}>
                        <div style={{ backgroundColor: 'white', margin: '2px' }}>
                        </div>
                        {chat.map((payload, index) => {
                            return (
                                <div key={index} style={{
                                    width: "100%",
                                    display: 'flex',
                                    justifyContent: `${payload.from !== userId ? 'left' : 'right'}`,
                                }}>
                                    <Paper sx={{
                                        minHeight: '10px',
                                        maxWidth: '25rem',
                                        p: '2px',
                                        textAlign: 'left',
                                        mx: '5px',
                                        my: '3px'
                                    }}>
                                        {payload.message}
                                    </Paper>
                                </div>
                            )
                        })}
                    </div>
                    <div className="chat-type">
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Multiline"
                            multiline
                            maxRows={4}
                            value={message}
                            onChange={handleChange}
                            sx={{ width: "80%", ml: 2 }}
                        />
                        <Button onClick={triggerSendMessage} sx={{ mr: 2 }} variant="contained" endIcon={<SendIcon />}>
                            Send
                        </Button>
                    </div>
                </Paper>
            </Box>
        </ThemeProvider>
    </div>;
}
