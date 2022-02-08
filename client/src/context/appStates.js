import { useEffect, useState } from "react";
import io from "socket.io-client";
import appContext from "./appContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";

const socket = io.connect("http://localhost:5000", {
    auth: {
        token: localStorage.getItem("authToken"),
        userId: localStorage.getItem("userId")
    }
});

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
    const [authToken, setAuthToken] = useState("");
    const [chat, setChat] = useState([]);
    const [clientId, setClientId] = useState(null);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchClientId, setSearchClientId] = useState(null);
    const [contacts, setContacts] = useState([]);

    // add the searched & clicked person in the contact list of the user
    const addContact = (client) => {
        setContacts([...contacts, client]);
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_HOST}/api/search/add_contact`,
            headers: {
                "auth-token": authToken
            },
            data: clientId
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // delete a particular contact from the list
    const deleteContact = (client) => {
        setContacts(contacts.filter(item => item !== client));
    }

    // change the client ID (used in case of searched click)
    const handleChangeClientId = (client) => {
        if (!contacts.includes(client)) {
            addContact(client);
        }
        setClientId(client);
    }

    // search function used in navbar for searching a clientID
    const searchClient = (clientId) => {
        setSearchLoader(true);
        axios.get(`${process.env.REACT_APP_HOST}/api/search?userid=${clientId}`)
            .then((response) => {
                setSearchClientId(response.data.userId);
                setSearchLoader(false);
            })
            .catch((error) => {
                setSearchLoader(false);
            })
    }


    useEffect(() => {
        // handling sending private message (client Side)
        socket.on("privateMes", (payload) => {
            console.log(payload);
            if (payload.to === userId) {
                setChat([...chat, payload]);
            }
            else {
                console.log("Its not matching the userId");
            }
        });
        let localId = localStorage.getItem("userId");
        let localToken = localStorage.getItem("authToken");
        if (localToken) {
            setAuthToken(localToken);
            setUserId(localId);
        }
    });


    // sending a message (emitting sendMes action)
    const sendMessage = (val) => {
        setChat([...chat, {
            message: val,
            from: userId,
            to: clientId
        }])
        socket.emit("privateMes", { message: val, from: userId, to: clientId });
    }


    return (

        <appContext.Provider
            value={{
                theme,
                userId,
                setUserId,
                sendMessage,
                chat,
                authToken,
                setAuthToken,
                searchClient,
                searchLoader,
                clientId,
                searchClientId,
                handleChangeClientId,
                addContact,
                deleteContact,
                contacts
            }}>
            {props.children}
        </appContext.Provider>
    )
}

export default AppStates;