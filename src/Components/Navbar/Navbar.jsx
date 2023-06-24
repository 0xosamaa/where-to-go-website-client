// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css';
import mainLogo from '../../assets/logos/main_logo.svg';
import secondaryLogo from '../../assets/logos/secondary_logo.svg';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoggedIn } from '../../Redux/Slices/authSlice';

const settings = [
    { name: 'Profile', path: '/profile' },
    { name: 'Logout', path: '/logout' },
    { name: 'Log in', path: '/login' },
    { name: 'Sign up', path: '/register' },
];

function Navbar() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const image = useSelector((state) => state.profile.image);

    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        dispatch(setIsLoggedIn(false));
        localStorage.clear();
        handleCloseUserMenu();
        navigate('/');
    };

    return (

        <AppBar
            position="sticky"
            color="common"
            style={{
                boxShadow:
                    '0px 2px 4px -1px rgba(0,0,0,0.06),0px 4px 5px 0px rgba(0,0,0,0.045),0px 1px 10px 0px rgba(0,0,0,0.03)',
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Link className="navbar-brand" to="/">
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            <img
                                src={
                                    isLoggedIn
                                        ? mainLogo
                                        : secondaryLogo
                                }
                                alt="Where to go"
                                width={32}
                            />
                        </Box>
                    </Link>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <img
                                src={
                                    isLoggedIn
                                        ? mainLogo
                                        : secondaryLogo
                                }
                                alt="Where to go"
                                width={32}
                            />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {/* {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))} */}
                            <Link to="/search">
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        Discover
                                    </Typography>
                                </MenuItem>
                            </Link>
                        </Menu>
                    </Box>
                    <Box
                        className="ms-4"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {/* {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))} */}
                        <Link to="/search">
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                Discover
                            </Button>
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Menu">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                {isLoggedIn ? (
                                    <Avatar
                                        alt="Profile Image"
                                        src={`http://localhost:8001/api/v1/images/customers/${image}`}
                                    />
                                ) : (
                                    <AccountCircleIcon
                                        color="primary"
                                        style={{ fontSize: 40 }}
                                    />
                                )}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) =>
                                setting.name === 'Logout' && isLoggedIn ? (
                                    <MenuItem
                                        key={setting.name}
                                        onClick={handleLogout}
                                    >
                                        <Typography textAlign="center">
                                            {setting.name}
                                        </Typography>
                                    </MenuItem>
                                ) : 
                                setting.name === 'Profile' && isLoggedIn ? (
                                    <Link key={setting.name} to={setting.path}>
                                        <MenuItem
                                            onClick={handleCloseUserMenu}
                                        >
                                            <Typography textAlign="center">
                                                {setting.name}
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                ) :
                                !isLoggedIn && (setting.name === 'Log in' || setting.name === 'Sign up') ? (
                                    <Link key={setting.name} to={setting.path}>
                                        <MenuItem
                                            onClick={handleCloseUserMenu}
                                        >
                                            <Typography textAlign="center">
                                                {setting.name}
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                ) : ('')
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
