import React, { useContext } from 'react';
import appContext from '../context/appContext';
import AllChats from './AllChats';
import ChatWindow from './ChatWindow';
import Box from "@mui/material/Box";
import TopNav from './TopNav';
import loader from "../assets/loader.gif";

function Home() {
    let { userId, loading } = useContext(appContext);
    return loading ? (<div style={{
        width: "100vw",
        height: "100vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <img src={loader} alt="Loading..." />
    </div>) : (
        <Box>
            <TopNav />
            <Box sx={{ display: 'flex', justifyContent: "space-between", mt: 2, mx: 2 }}>
                <div>
                    <AllChats />
                </div>
                <div>
                    <ChatWindow />
                </div>
            </Box>
        </Box>
    );
}

export default Home;
