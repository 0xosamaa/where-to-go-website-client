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

const VerifyResetCode = () => {
    const [loading, setLoading] = useState(false);
    const [resetCode, setResetCode] = useState('');

    const [formErrors, setFormErrors] = useState({
        resetCode: '',
    });
    const [resetCodeError, setResetCodeError] = useState();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleVerifyResetCode()
        }
    }

    const handleVerifyResetCode = async () => {
        setLoading(true);
        setResetCodeError(false);
        setFormErrors({
            resetCode: '',
        });

        let isValid = true;

        if (resetCode.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                resetCode: 'Code Required',
            }));
            isValid = false;
        }

        if (isValid) {
            try {
                const res = await axiosInstance.post(
                    '/api/v1/auth/customer/verifyResetCode',
                    {'resetCode': resetCode}
                );
                if (res.status === 200) {
                    navigate('/vendor/resetPassword');
                }
            } catch (err) {
                setResetCodeError(true);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        if (resetCodeError) {
            navigate('/vendor/verifyResetCode');
        }
    }, []);

    useEffect(() => {
        if (resetCodeError)
            setTimeout(() => {
                setResetCodeError(false);
            }, 3 * 1000);
    }, [resetCodeError]);

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
                                        We sent you a code, Please check your mail.
                                    </Typography>
                                </div>
                            </div>
                            <div className="row" style={{ padding: '.375rem .75rem' }}>
                                {resetCodeError && (
                                    <div style={{ padding: '.375rem .75rem' }}>
                                        <div className="alert alert-danger col-12">
                                            Failed to verify this code..!
                                        </div>
                                    </div>
                                )}
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="resetCode"
                                        placeholder="Reset Code"
                                        value={resetCode}
                                        onChange={(e) =>
                                            setResetCode(e.target.value)
                                        }
                                        onKeyDown={handleEnter}
                                    />
                                    <small style={{ color: 'red' }}>
                                        {formErrors.resetCode}
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
                                            onClick={handleVerifyResetCode}
                                            className="col-12"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Send
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

export default VerifyResetCode;
