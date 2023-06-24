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
  
  const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const [formErrors, setFormErrors] = useState({
      newPassword: '',
      confirmPassword: '',
    });
    const [resetPassError, setResetPassError] = useState();
    const navigate = useNavigate();
    const theme = useTheme();
  
    const handleEnter = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        handleResetPassword();
      }
    };
  
    const handleResetPassword = async () => {
      setLoading(true);
      setResetPassError(false);
      setFormErrors({
        newPassword: '',
        confirmPassword: '',
      });
  
      let isValid = true;
  
      if (newPassword.length === 0) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          newPassword: 'New Password Required',
        }));
        isValid = false;
      }
  
      if (confirmPassword.length === 0) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: 'Confirm Password Required',
        }));
        isValid = false;
      } else if (confirmPassword !== newPassword) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: 'Passwords do not match',
        }));
        isValid = false;
      }
  
      if (isValid) {
        try {
          const res = await axiosInstance.post('/api/v1/auth/customer/resetPassword', {
            newPassword: newPassword,
          });
  
          if (res.status === 200) {
            navigate('/vendor/login');
          }
        } catch (err) {
          setResetPassError(true);
        }
      }
  
      setLoading(false);
    };
  
    useEffect(() => {
      if (resetPassError) {
        navigate('/vendor/resetPassword');
      }
    }, []);
  
    useEffect(() => {
      if (resetPassError) {
        setTimeout(() => {
          setResetPassError(false);
        }, 3 * 1000);
      }
    }, [resetPassError]);
  
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
                      Reset Password
                    </Typography>
                  </div>
                </div>
                <div className="row" style={{ padding: '.375rem .75rem' }}>
                  {resetPassError && (
                    <div style={{ padding: '.375rem .75rem' }}>
                      <div className="alert alert-danger col-12">
                        Failed to reset the password..!
                      </div>
                    </div>
                  )}
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="newPassword"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onKeyDown={handleEnter}
                    />
                    <small style={{ color: 'red' }}>
                      {formErrors.newPassword}
                    </small>
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onKeyDown={handleEnter}
                    />
                    <small style={{ color: 'red' }}>
                      {formErrors.confirmPassword}
                    </small>
                  </div>
                  <div className="mb-3">
                    {loading ? (
                      <div className="col-12 text-center">
                        <RiseLoader
                          color={theme.palette.primary.main}
                          loading={loading}
                          size={10}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      </div>
                    ) : (
                      <Button
                        onClick={handleResetPassword}
                        className="col-12"
                        variant="contained"
                        color="primary"
                      >
                        Reset Password
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
  
  export default ResetPassword;
  