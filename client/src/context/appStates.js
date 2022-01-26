import { useEffect, useState } from "react";
import io from "socket.io-client";
import appContext from "./appContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const socket = io.connect("http://localhost:5000");


const AppStates = (props) => {
    // for material-ui theme breakpoints
    const theme = createTheme({
        breakpoints: {
            values: {
                mobile: 0,
                tablet: 640,
                laptop: 1024,
                desktop: 1280,
            },
        },
    });

    const [userId, setUserId] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.on("myId", (payload) => {
            setUserId(payload.id);
        });
    }, []);

    useEffect(() => {
        socket.on("sendMes", (payload) => {
            setChat([...chat, payload]);
        })
    });


    // sending a message (emitting sendMes action)
    const sendMessage = (val) => {
        socket.emit("sendMes", { message: val, userId });
    }


    return (

        <appContext.Provider
            value={{
                theme,
                userId,
                sendMessage,
                chat,
            }}>
            {props.children}
        </appContext.Provider>
    )
}

export default AppStates;