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
import { RiseLoader } from 'react-spinners';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Axios';
import mainLogo from '../../assets/logos/main_logo.svg';
import registerIll from '../../assets/images/register/register-ill.png';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });
    const [loginError, setLoginError] = useState();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleLogin = async () => {
        setLoading(true);
        setLoginError(false);
        setFormErrors({
            email: '',
            password: '',
        });

        let isValid = true;

        if (loginDetails.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Email Required',
            }));
            isValid = false;
        } else if (
            !loginDetails.email.match(
                /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/
            )
        ) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Invalid Email',
            }));
            isValid = false;
        }

        if (loginDetails.password.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Password Required',
            }));
            isValid = false;
        } else if (
            !loginDetails.password.match(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/
            )
        ) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Invalid Password',
            }));
            isValid = false;
        }

        if (isValid) {
            try {
                const res = await axiosInstance.post(
                    'api/v1/customer/login',
                    loginDetails
                );
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('img', res.data.img);
                navigate('/');
            } catch (err) {
                console.log(err);
                setLoginError(true);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        if (loginError)
            setTimeout(() => {
                setLoginError(false);
            }, 3 * 1000);
    }, [loginError]);

    return (
        <>
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
                                    src={mainLogo}
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
            <Container
                maxWidth="lg"
                className="d-flex justify-content-center align-items-center mt-5"
                style={{
                    minHeight: "calc(100vh - 64px)'",
                }}
            >
                <div
                    className="row"
                    style={{
                        boxShadow: '8px 8px 32px 0 rgba(1, 60, 60, 0.5)',
                    }}
                >
                    <div
                        className="col-12 col-lg-6 p-5"
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
                                        Login as a User
                                    </Typography>
                                </div>
                            </div>
                            <div className="row">
                                {loginError && (
                                    <div style={{ padding: '.375rem .75rem' }}>
                                        <div className="alert alert-danger col-12">
                                            Login failed
                                        </div>
                                    </div>
                                )}
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Email"
                                        value={loginDetails.email}
                                        onChange={(e) =>
                                            setLoginDetails({
                                                ...loginDetails,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                    <small style={{ color: 'red' }}>
                                        {formErrors.email}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        value={loginDetails.password}
                                        onChange={(e) =>
                                            setLoginDetails({
                                                ...loginDetails,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                    <small style={{ color: 'red' }}>
                                        {formErrors.password}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <Typography variant="p">
                                        Don't have an account?{' '}
                                        <Link to="/register">
                                            <Typography
                                                variant="span"
                                                color={'#00bbaa'}
                                            >
                                                Sign up
                                            </Typography>
                                        </Link>
                                    </Typography>
                                </div>
                                <div className="mb-3">
                                    {loading ? (
                                        <div className="col-12 text-center">
                                            <RiseLoader
                                                color={
                                                    theme.palette.primary.main
                                                }
                                                loading={loading}
                                                size={10}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={handleLogin}
                                            className="col-12"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Sign in
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Container>
                    </div>
                    <div
                        className="col-12 col-lg-6 p-5 d-none d-lg-block"
                        style={{ backgroundColor: 'rgb(1, 140, 128)' }}
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

export default Login;
