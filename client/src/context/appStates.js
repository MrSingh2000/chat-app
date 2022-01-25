import { useEffect, useState } from "react";
import io from "socket.io-client";
import appContext from "./appContext";

const socket = io.connect("http://localhost:5000");

const AppStates = (props) => {
    const [userId, setUserId] = useState("");

    useEffect(() => {
        socket.on("myId", (payload) => {
            setUserId(payload.id);
            console.log(payload);
        });
    }, []);


    return (

        <appContext.Provider
            value={{
                userId,
            }}>
            {props.children}
        </appContext.Provider>
    )
}

export default AppStates;