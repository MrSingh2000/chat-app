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
    const [profileDetails, setProfileDetails] = useState({
        user: userId,
        bio: "Add your Bio",
        pic: "",
        status: ""
    });

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
            })
            .catch((err) => {
                console.log("Error in Contact Delete: ", err);
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
                console.log(res.data.details);
            })
            .catch((err) => {
                console.log(err);
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
        else {
            return;
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
                    console.log(err);
                })
        }
    }

    // function to send picture uploaded to the server (AWS) through backend
    const handleProfilePic = (file) => {
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
                    console.log(err);
                })
        }
    }
    // this useEffect is used only once when user loggedIn or authToken is got
    useEffect(() => {
        getContactsOnce();
        getProfileDetails();
    }, [authToken]);



    // change the client ID (used in case of searched click)
    const handleChangeClientId = (client) => {
        // check if contact already exists, and if yes dont send backend request for contact add
        for (let i = 0; i < contacts.length; i++) {
            console.log(contacts[i].data)
            if (contacts[i].data === client) {
                setClientId(client);
                return;
            }
        }
        addContact(client);
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
                contacts,
                getContactsOnce,
                profileDetails,
                setClientId,
                handleProfilePic
            }}>
            {props.children}
        </appContext.Provider>
    )
}

export default AppStates;