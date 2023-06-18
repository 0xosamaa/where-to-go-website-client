import React from 'react';
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
    useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import mainLogo from '../../assets/logos/main_logo.svg';
import secondaryLogo from '../../assets/logos/secondary_logo.svg';
const SecNavbar = () => {
    return (
        <AppBar
            position="sticky"
            color="common"
            style={{
                // backgroundColor: '#00bbaa',
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
                                src={
                                    localStorage.getItem('token')
                                        ? mainLogo
                                        : secondaryLogo
                                }
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
                        src={mainLogo}
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
    );
};

export default SecNavbar;
