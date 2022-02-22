import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from 'react-router-dom';
import appContext from '../../context/appContext';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Input from '@mui/material/Input';
import LocalSeeOutlinedIcon from '@mui/icons-material/LocalSeeOutlined';
import { CoPresentOutlined } from '@mui/icons-material';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function AlertDialogSlide(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { setUpdatedBio, updatedBio } = props;

    const {
        profileDetails,
        updateProfileDetails
    } = React.useContext(appContext);

    const handleEdit = () => {
        updateProfileDetails("bio", updatedBio);
        handleClose();
    }

    return (
        <div>
            <IconButton aria-label="edit" onClick={handleClickOpen}>
                <BorderColorOutlinedIcon fontSize="3rem" />
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Update Your Bio!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Input onChange={(e) => { setUpdatedBio(e.target.value) }} value={updatedBio} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEdit}>Edit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


export default function Profile() {
    const {
        userId,
        profileDetails,
        authToken,
        theme
    } = React.useContext(appContext);
    let navigate = useNavigate();

    const [updatedBio, setUpdatedBio] = React.useState("");

    // function to send picture uploaded to the server (AWS) through backend

    const handleProfilePic = (e) => {
        console.log(e.target.files[0]);
        let data = new FormData();
        data.append("profilePic", e.target.files[0]);
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
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={() => { navigate(-1) }}
                            >
                                <ArrowBackOutlinedIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    textAlign: 'center',
                }}>
                    <Paper elevation={4} sx={{
                        width: {
                            mobile: "90vw",
                            tablet: "32rem",
                        },
                        padding: '10px',
                        height: '80vh',
                        backgroundColor: 'red',
                    }}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar sx={{ height: '5rem', width: '5rem' }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <label id="profilePic" style={{ position: 'absolute' }}>
                                    <LocalSeeOutlinedIcon sx={{ height: '4rem', width: '4rem' }} />
                                    <input onChange={(e) => handleProfilePic(e)} style={{ display: 'none' }} type="file" />
                                </label>
                            </div>
                        </StyledBadge>
                        <h2>{userId}</h2>
                        <div>
                            <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>{profileDetails.bio ? profileDetails.bio : "Add your Bio"}
                                <span style={{ cursor: 'pointer', marginLeft: '8px' }}>
                                    <AlertDialogSlide setUpdatedBio={setUpdatedBio} updatedBio={updatedBio} />
                                </span>
                            </p>
                        </div>
                    </Paper>
                </Box>
            </ThemeProvider>
        </>
    );
}
