import React, { useContext } from 'react';
import appContext from '../context/appContext';
import AllChats from './AllChats';
import ChatWindow from './ChatWindow';
import Box from "@mui/material/Box";
import TopNav from './TopNav';

function Home() {
    let { userId } = useContext(appContext);
    return (
        <Box>
            <TopNav />
            <Box sx={{ display: 'flex', justifyContent: "space-evenly", mt: 2 }}>
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
