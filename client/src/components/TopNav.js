import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import appContext from '../context/appContext';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 0),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function TopNav() {
    const {
        userId,
        searchClient,
        searchClientId,
        searchLoader,
        handleChangeClientId,
        addContact,
        deleteContact,
    } = React.useContext(appContext);
    const [searchedId, setSearchedId] = React.useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Link to="/status" style={{ textDecoration: "none", color: "black" }}>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <CollectionsOutlinedIcon />
                    </IconButton>
                    <p>Status</p>
                </Link>
            </MenuItem>
        </Menu>
    );

    const handleSearchClick = () => {
        if (searchClientId === searchedId) {
            handleChangeClientId(searchClientId);
            setSearchedId("");
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 2 }}
                                    {...bindTrigger(popupState)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu {...bindMenu(popupState)}>
                                    <MenuItem onClick={popupState.close}>
                                        <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
                                            Profile
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={popupState.close}>Logout</MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Chatty {userId}
                    </Typography>
                    <div >
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon sx={{ color: "white" }} />
                            </SearchIconWrapper>
                            <StyledInputBase
                                onChange={(e) => {
                                    searchClient(e.target.value);
                                    setSearchedId(e.target.value);
                                }}
                                placeholder="Enter Valid Username"
                                value={searchedId}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Paper elevation={4} sx={{ textAlign: 'center', backgroundColor: 'white', color: 'black', position: 'absolute', margin: 'auto', borderRadius: '10px', padding: '10px', overflowY: 'auto', overflowX: 'hidden', maxHeight: '10rem', zIndex: '1', display: `${!searchedId ? "none" : "block"}` }}>
                            <Button onClick={handleSearchClick}>
                                {searchLoader ? "Loading.." : !searchedId ? "" : searchClientId && searchClientId === searchedId ? searchClientId : "Invalid Username"}
                            </Button>
                        </Paper>
                    </div>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Link to="/status" style={{ textDecoration: "none", color: "white" }}>
                                <CollectionsOutlinedIcon />
                            </Link>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
