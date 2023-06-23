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
import secondaryLogo from '../../assets/logos/secondary_logo.svg';
import registerIll from '../../assets/images/register/register-ill.png';
import SecNavbar from '../../Components/SecNavbar/SecNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoggedIn } from '../../Redux/Slices/authSlice';
import { setImage } from '../../Redux/Slices/profileSlice';

const Login = () => {
    const dispatch = useDispatch();
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
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleLogin()
        }
    }

    const handleLogin = async () => {
        setLoading(true);
        setLoginError(false);
        setFormErrors({
            email: '',
            password: '',
        });

        let isValid = true;

        if (loginDetails.email.length === 0) {
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
                    '/api/v1/auth/customer/login',
                    loginDetails
                );
                dispatch(setIsLoggedIn(true));
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.id);
                localStorage.setItem('img', res.data.img);
                dispatch(setImage(res.data.img));
                navigate('/');
            } catch (err) {
                setLoginError(true);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (loginError)
            setTimeout(() => {
                setLoginError(false);
            }, 3 * 1000);
    }, [loginError]);

    return (
        <>
            <SecNavbar />
            <Container
                maxWidth="lg"
                className="d-flex justify-content-center align-items-center"
                style={{
                    minHeight: 'calc(100vh - 64px)',
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
                                        onKeyDown={handleEnter}
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
                                        onKeyDown={handleEnter}
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
                                                color={
                                                    theme.palette.primary.main
                                                }
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
                                <div className="mb-3 my-3 text-center">
                                    <Typography variant="p">
                                        Login as a Vendor?{' '}
                                        <Link to="http://localhost:3000/vendor/login">
                                            <Typography
                                                variant="span"
                                                color={
                                                    theme.palette.primary.main
                                                }
                                            >
                                                Sign in
                                            </Typography>
                                        </Link>
                                    </Typography>
                                </div>
                            </div>
                        </Container>
                    </div>
                    <div
                        className="col-12 col-lg-6 p-5 d-none d-lg-block"
                        style={{ backgroundColor: theme.palette.primary.main }}
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
