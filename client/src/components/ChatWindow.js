import React, { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import appContext from '../context/appContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function ChatWindow() {
    let {
        theme,
        sendMessage,
        chat,
        userId,

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
            <div style={{ position: 'relative' }}>
                <Paper sx={{
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
                    <div className="scrollBar" style={{overflowY: 'scroll'}}>
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
            </div>
        </ThemeProvider>
    </div>;
}
