import * as React from 'react';
import List from '@mui/material/List';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import appContext from '../context/appContext';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from '@mui/material/styles';
import axios from "axios";

export default function AllStatus(props) {
  const {
    contacts,
    handleChangeClientId,
    deleteContact,
    theme,
    clientId,
    userId,
    authToken,
    getProfileDetails,
    getStatus,
    allStatus
  } = React.useContext(appContext);

  const { setSelectedImage } = props;

  // delete a status of the user
  const deleteStatus = (user, index) => {
    axios({
      url: `${process.env.REACT_APP_HOST}/api/status/delete/?user=${user}&index=${index}`,
      method: 'delete',
      headers: {
        "auth-token": authToken,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <ImageList sx={{
        width: '500',
        height: '83vh',
        overflowY: 'scroll',
      }}>
        {allStatus.map((item, index) => {
          return (
            <div key={index} style={{ cursor: "pointer" }}>
              {item.userStatus.map((url, imgIndex) => {
                return (
                  <ImageListItem key={imgIndex}>
                    <img
                      src={`${url}?w=248&fit=crop&auto=format`}
                      srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      // alt={item.title}
                      loading="lazy"
                      onClick={() => { setSelectedImage(url) }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <ImageListItemBar
                        subtitle={<span>by: {item.user}</span>}
                        position="below"
                      />
                      <div onClick={() => {
                        deleteStatus(item.user, imgIndex);
                        setTimeout(() => {
                          getProfileDetails();
                          getStatus();
                        }, 500);
                      }} style={{ display: `${item.user === userId ? 'block' : 'none'}` }}>
                        <IconButton aria-label="delete">
                          <DeleteIcon style={{ fontSize: '15px' }} />
                        </IconButton>
                      </div>
                    </div>

                  </ImageListItem>
                )
              })}
            </div>
          )
        })}
      </ImageList>
    </ThemeProvider >
  );
}
