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


export default function AllChats() {
  const {
    contacts,
    handleChangeClientId,
    deleteContact
  } = React.useContext(appContext);
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {contacts.map((client, index) => {
        return (
          <div key={index} style={{cursor: "pointer"}} onClick={() => {handleChangeClientId(client.data)}}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={client.data}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      You
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
              <div onClick={() => {deleteContact(client.data)}} style={{marginTop: '2px', color: 'blue', cursor: 'pointer'}}>
                <DeleteForeverOutlinedIcon/>
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        )
      })}
    </List>
  );
}
