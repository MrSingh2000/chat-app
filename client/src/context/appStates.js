import { useEffect, useState } from "react";
import io from "socket.io-client";
import appContext from "./appContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";

const socket = io.connect("https://my-chat-app-backend.herokuapp.com/", {
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
    const [profileDetails, setProfileDetails] = useState({
        user: userId,
        bio: "Add your Bio",
        pic: "",
        status: ""
    });
    // state for error management in app on client side
    const [error, setError] = useState();
    const [errorType, setErrorType] = useState("error");
    const [loading, setLoading] = useState(false);

    // add the searched & clicked person in the contact list of the user
    const addContact = (client) => {
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_HOST}/api/search/add_contact`,
            headers: {
                "auth-token": authToken
            },
            data: {
                clientId: client
            }
        })
            .then((res) => {
                setContacts([...res.data.contact.contacts]);
            })
            .catch((err) => {
                console.log("Error in Contact Add: ", err);
            })
    }

    // delete a particular contact from the list
    const deleteContact = (client) => {
        setLoading(true);
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_HOST}/api/search/delete_contact`,
            headers: {
                "auth-token": authToken
            },
            data: {
                clientId: client
            }
        })
            .then((res) => {
                setContacts([...res.data]);
                setClientId();
                setLoading(false);
            })
            .catch((err) => {
                console.log("Error in Contact Delete: ", err);
                setLoading(false);
            })
    }

    // get the profile details of the user
    const getProfileDetails = () => {
        axios({
            url: `${process.env.REACT_APP_HOST}/api/user/details`,
            method: 'get',
            headers: {
                "auth-token": authToken,
            }
        })
            .then((res) => {
                setProfileDetails(res.data.details);
            })
            .catch((err) => {
                console.log("Error in get Profile Details: ", err);
            })
    }

    // update any profile details by the parameter
    const updateProfileDetails = (param, value) => {
        let url, data;
        if (param === "bio") {
            url = `${process.env.REACT_APP_HOST}/api/user/bio`;
            data = {
                bio: value
            }
        }
        else if (param === "profile_pic") {
            setProfileDetails({ ...profileDetails, pic: value });
        }
        else if (param === "save_status") {
            url = `${process.env.REACT_APP_HOST}/api/user/bio`;
            data = {
                status: value
            }
        }
        else if (param === "delete_status") {
            url = `${process.env.REACT_APP_HOST}/api/user/bio`;
            data = {
                status: value
            }
        }
        if (param !== "profile_pic") {
            axios({
                url,
                method: 'post',
                headers: {
                    "auth-token": authToken
                },
                data
            })
                .then((res) => {
                    setProfileDetails(res.data.details);
                })
                .catch((err) => {
                    console.log("Error in update profile details: ", err);
                })
        }
    }

    // function to send picture uploaded to the server (AWS) through backend
    const handleProfilePic = (file) => {
        setLoading(true);
        let data = new FormData();
        data.append("profilePic", file);
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_HOST}/api/user/profile_pic`,
            headers: {
                "auth-token": authToken,
                "Content-Type": "ultipart/form-data",
            },
            data
        })
            .then((res) => {
                updateProfileDetails("profile_pic", res.data.details.pic);
                setLoading(false);
            })
    }

    // get the contacts of the user once user logged In
    const getContactsOnce = () => {
        if (authToken) {
            axios({
                method: "get",
                url: `${process.env.REACT_APP_HOST}/api/search/my_contacts`,
                headers: {
                    "auth-token": authToken
                }
            })
                .then((res) => {
                    setContacts([...res.data.contact.contacts]);
                })
                .catch((err) => {
                    console.log("Error in getting contacts list: ", err);
                })
        }
    }
    // this useEffect is used only once when user loggedIn or authToken is got
    useEffect(() => {
        getContactsOnce();
        getProfileDetails();
    }, [authToken]);

    // update the last message of a certain contact from the frontend side (don't send backend request)
    // TODO: Can implement last chat feature to be shown on chats (can be implemented in future)
    const updateLastMessage = (target, message) => {
        let oldContact = contacts;
        for (let i = 0; i < oldContact.length; i++) {
            if (i === target) {
                i.lastChat = message;
                return;
            }
        }
    }

    // get user chat
    const getUserChat = (from, to) => {
        // handling reciveing of user chat on client side
        socket.on("sendChat", (payload) => {
            if (payload.response === null) {
                setChat([]);
                return;
            }
            setChat(payload.response.message);
        })
    }

    // change the client ID (used in case of searched click)
    const handleChangeClientId = (client) => {
        if (client === userId) {
            return;
        }
        let clientPresent = false;
        // check if contact already exists, and if yes dont send backend request for contact add
        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].data === client) {
                setClientId(client);
                clientPresent = true;
                break;
            }
        }
        if (!clientPresent) {
            addContact(client);
        }
        // sending SendChat request to backend for that particular user
        socket.emit("sendChat", { user: userId, client: client });
        setClientId(client);
        getUserChat(userId, client);
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

    // useEffect hook for user logged in details verification (runs always)
    useEffect(() => {
        let localId = localStorage.getItem("userId");
        let localToken = localStorage.getItem("authToken");
        if (localToken) {
            setAuthToken(localToken);
            setUserId(localId);
        }
    });


    useEffect(() => {
        // handling sending private message (client Side)
        socket.on("privateMes", (payload) => {
            if (payload.to === userId) {
                setChat([...chat, payload]);
            }
        });
    })

    // sending a message (emitting sendMes action)
    const sendMessage = (val) => {
        setChat([...chat, {
            data: val,
            user: userId,
        }])
        // updateLastMessage(clientId, val);
        socket.emit("privateMes", { message: val, from: userId, to: clientId });
    }

    // PLAYING WITH STATUS FUNCTIONALITY HERE: 

    const [allStatus, setAllStatus] = useState([]);

    // to get the status
    const getStatus = () => {
        // get all the status(s) availalble on the cloud
        axios({
            url: `${process.env.REACT_APP_HOST}/api/status/all`,
            method: 'get',
        })
            .then((res) => {
                setAllStatus(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // add a status of the user
    const addStatus = (file) => {
        setLoading(true);
        let data = new FormData();
        data.append("status", file);
        axios({
            url: `${process.env.REACT_APP_HOST}/api/status/add`,
            method: 'post',
            headers: {
                "auth-token": authToken,
            },
            data
        })
            .then((res) => {
                setLoading(false);
                getStatus();
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            })
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
                contacts,
                getContactsOnce,
                profileDetails,
                setClientId,
                handleProfilePic,
                addStatus,
                getProfileDetails,
                allStatus,
                getStatus,
                error,
                updateProfileDetails,
                setError,
                loading,
                setLoading,
            }}>
            {props.children}
        </appContext.Provider>
    )
}

export default AppStates;