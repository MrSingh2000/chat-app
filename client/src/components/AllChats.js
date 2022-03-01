import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import appContext from '../context/appContext';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import pp from "../assets/user.png";
import chatIcon from "../assets/chat.png";
import { Box } from '@mui/material';
import loader from "../assets/loader.gif";

export default function AllChats() {
  const {
    contacts,
    handleChangeClientId,
    deleteContact,
    theme,
    clientId,
    loading,
  } = React.useContext(appContext);


  return loading ? (<div style={{
    width: "100vw",
    height: "100vh",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <img src={loader} alt="Loading..." />
  </div>) : (
    <ThemeProvider theme={theme}>
      {/* DeskTop Version of Chats */}
      <List sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        display: {
          mobile: `${clientId ? "none" : "block"}`,
          tablet: "block"
        }
      }}>
        {contacts.map((client, index) => {
          return (
            <div key={index} style={{ cursor: "pointer" }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={client.pic === "nopic" ? pp : client.pic} />
                </ListItemAvatar>
                <ListItemText
                  onClick={() => { handleChangeClientId(client.data) }}
                  primary={client.data}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body1"
                        color="text.primary"
                      >
                        <span style={{
                          visibility: 'hidden',
                        }}>
                          I'll be in your neighborhood doing
                        </span>
                      </Typography>
                    </React.Fragment>
                  }
                />
                <div onClick={() => { deleteContact(client.data) }} style={{ marginTop: '2px', color: 'blue', cursor: 'pointer' }}>
                  <DeleteForeverOutlinedIcon />
                </div>
              </ListItem>
              <Divider sx={{
                position: 'relative',
                top: '-10px'
              }} variant="inset" component="li" />
            </div>
          )
        })}
      </List>
      {/* MOBILE VERSION OF ALL CHATS */}
      {clientId ? null : contacts.length === 0 ? (<Box sx={{
        backgroundColor: '#BCCEFB', width: '90vw', height: '100vh',
        display: {
          mobile: "block",
          tablet: "none"
        }
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ marginTop: '100px' }}>
            <div style={{ fontSize: '20px', marginBottom: '10px' }}>
              <span style={{ fontWeight: 'bolder' }}>Search</span> a <span style={{ fontWeight: 'bolder', color: 'white' }}>userName</span> to begin Chat!
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src={chatIcon} alt="ChatIcon" height="150px" />
            </div>
          </div>
        </div>
      </Box>) : null}
    </ThemeProvider>
  );
}
