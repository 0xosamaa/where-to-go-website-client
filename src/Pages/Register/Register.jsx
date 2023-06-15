import {
    Container,
    Typography,
    Button,
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Menu,
    Avatar,
    Tooltip,
    MenuItem,
} from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import whiteLogo from '../../assets/logos/white_logo.svg';
import registerIll from '../../assets/images/register/register-ill.png';

const Register = () => {
    useEffect(() => {
        document.body.style.backgroundColor = '#00bbaa';

        return () => {
            document.body.style.backgroundColor = '#fff';
        };
    }, []);

    return (
        <>
            <AppBar
                position="sticky"
                color="common"
                style={{
                    backgroundColor: '#00bbaa',
                    boxShadow: 'none',
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
                                    src={whiteLogo}
                                    alt="Where to go"
                                    width={32}
                                />
                            </Box>
                        </Link>

                        {/* <Box
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
                                    src={whiteLogo}
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
                                {pages.map((page) => (
                                    <MenuItem
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography textAlign="center">
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box> */}
                        {/* <Box
                            className="ms-4"
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'black',
                                        display: 'block',
                                    }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box> */}

                        {/* <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                    />
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
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <Typography textAlign="center">
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box> */}
                    </Toolbar>
                </Container>
            </AppBar>
            <Container
                maxWidth="lg"
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: 'calc(100vh - 64px)' }}
            >
                <div className="row">
                    <div
                        className="col-6 p-5"
                        style={{ backgroundColor: '#fff' }}
                    >
                        <Container
                            maxWidth="xs"
                            className="d-flex flex-column justify-content-center align-items-center h-100"
                        >
                            <div className="row">
                                <div className="col-12">
                                    <Typography
                                        variant="h2"
                                        className="text-center mb-3"
                                    >
                                        Become a user
                                    </Typography>
                                </div>
                            </div>
                            <div className="row">
                                <div class="mb-3">
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="name"
                                        placeholder="Name"
                                    />
                                </div>
                                <div class="mb-3">
                                    <input
                                        type="email"
                                        class="form-control"
                                        name="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div class="mb-3">
                                    <input
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        placeholder="Password"
                                    />
                                </div>
                                <div class="mb-3">
                                    <Typography variant="p">
                                        Already have an account?{' '}
                                        <Link to="/login">
                                            <Typography
                                                variant="span"
                                                color={'#00bbaa'}
                                            >
                                                Sign in
                                            </Typography>
                                        </Link>
                                    </Typography>
                                </div>
                                <div class="mb-3">
                                    <Button
                                        onClick={''}
                                        className="col-12"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Sign up
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </div>
                    <div
                        className="col-6 p-5"
                        style={{ backgroundColor: '#0053CC' }}
                    >
                        <img
                            src={registerIll}
                            alt=""
                            style={{ maxWidth: '100%' }}
                        />
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Register;
