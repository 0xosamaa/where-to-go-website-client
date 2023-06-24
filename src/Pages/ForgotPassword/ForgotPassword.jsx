import {
    Container,
    Typography,
    Button,
    useTheme,
} from '@mui/material';
import { RiseLoader } from 'react-spinners';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Axios';
import SecNavbar from '../../Components/SecNavbar/SecNavbar';

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const [formErrors, setFormErrors] = useState({
        email: '',
    });
    const [forgotPassError, setForgotPassError] = useState();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleForgotPassword()
        }
    }

    const handleForgotPassword = async () => {
        setLoading(true);
        setForgotPassError(false);
        setFormErrors({
            email: '',
        });

        let isValid = true;

        if (email.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Email Required',
            }));
            isValid = false;
        } else if (
            !email.match(
                /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/
            )
        ) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Invalid Email',
            }));
            isValid = false;
        }

        if (isValid) {
            try {
                const res = await axiosInstance.post(
                    '/api/v1/auth/customer/forgotPassword',
                    {'email': email}
                );
                if (res.status === 200) {
                    navigate('/vendor/verifyResetCode');
                }
            } catch (err) {
                setForgotPassError(true);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        if (forgotPassError) {
            navigate('/vendor/forgotPassword');
        }
    }, []);

    useEffect(() => {
        if (forgotPassError)
            setTimeout(() => {
                setForgotPassError(false);
            }, 3 * 1000);
    }, [forgotPassError]);

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
                        className="col-12 p-5"
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
                                        Search for your account
                                    </Typography>
                                </div>
                            </div>
                            <div className="row" style={{ padding: '.375rem .75rem' }}>
                                {forgotPassError && (
                                    <div style={{ padding: '.375rem .75rem' }}>
                                        <div className="alert alert-danger col-12">
                                            Failed to find this account..!
                                        </div>
                                    </div>
                                )}
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        onKeyDown={handleEnter}
                                    />
                                    <small style={{ color: 'red' }}>
                                        {formErrors.email}
                                    </small>
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
                                            onClick={handleForgotPassword}
                                            className="col-12"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Search
                                        </Button>
                                    )}
                                </div>
                                
                            </div>
                        </Container>
                    </div>
                    
                </div>
            </Container>
        </>
    );
};

export default ForgotPassword;
