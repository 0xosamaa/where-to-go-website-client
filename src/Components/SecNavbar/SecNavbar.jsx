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
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default SecNavbar;
