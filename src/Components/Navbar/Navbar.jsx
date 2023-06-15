// import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css';
import mainLogo from '../../assets/logos/main_logo.svg';

// const Navbar = () => {
//     return (
//         <nav className="navbar navbar-expand-lg bg-body-tertiary">
//             <div class="container">
//                 <Link class="navbar-brand" href="#">
//                     <img src={mainLogo} alt="Where to go" width={32} />
//                 </Link>
//                 <button
//                     class="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarSupportedContent"
//                     aria-controls="navbarSupportedContent"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                 >
//                     <span class="navbar-toggler-icon"></span>
//                 </button>
//                 <div
//                     class="collapse navbar-collapse"
//                     id="navbarSupportedContent"
//                 >
//                     <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li class="nav-item">
//                             <Link
//                                 class="nav-link active"
//                                 aria-current="page"
//                                 href="#"
//                             >
//                                 Places to go
//                             </Link>
//                         </li>
//                         <li class="nav-item">
//                             <Link class="nav-link" href="#">
//                                 Experiences
//                             </Link>
//                         </li>
//                         <li class="nav-item">
//                             <Link class="nav-link" href="#">
//                                 Discover
//                             </Link>
//                         </li>
//                     </ul>
//                     <ul class="navbar-nav">
//                         <li class="nav-item dropdown">
//                             <button
//                                 class="btn btn-light dropdown-toggle"
//                                 data-bs-toggle="dropdown"
//                                 aria-expanded="false"
//                             >
//                                 Mohammad
//                             </button>
//                             <ul class="dropdown-menu dropdown-menu-light">
//                                 <li>
//                                     <Link class="dropdown-item" href="#">
//                                         Profile
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link class="dropdown-item" href="#">
//                                         History
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link class="dropdown-item" href="#">
//                                         Logout
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

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

const pages = ['Places to go', 'Experiences', 'Discover'];
const settings = [
    { name: 'Profile', path: '/profile' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
    { name: 'Logout', path: '/logout' },
];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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
                            <img src={mainLogo} alt="Where to go" width={32} />
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
                            <img src={mainLogo} alt="Where to go" width={32} />
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
                    </Box>
                    <Box
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
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Menu">
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
                                <Link to={setting.path}>
                                    <MenuItem
                                        key={setting.name}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <Typography textAlign="center">
                                            {setting.name}
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
