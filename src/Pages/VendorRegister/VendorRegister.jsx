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
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { RiseLoader } from 'react-spinners';
import mainLogo from '../../assets/logos/main_logo.svg';
import secondaryLogo from '../../assets/logos/secondary_logo.svg';
import registerIll from '../../assets/images/register/register-ill.png';
import axiosInstance from '../../Axios';
import { Margin } from '@mui/icons-material';
import axios from 'axios';

const VendorRegister = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState(null);
    const [countries, setCountries] = useState(null);
    const [cities, setCities] = useState(null);
    const [states, setStates] = useState(null);
    const [vendorData, setVendorData] = useState({
        firstName: '',
        lastName: '',
        placeName: '',
        category: '',
        country: '',
        state: '',
        city: '',
        street: '',
        zip: '',
        phoneNumber: '',
        email: '',
        password: '',
        description: '',
        thumbnail: '',
        gallery: [],
    });
    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        placeName: '',
        category: '',
        country: '',
        state: '',
        city: '',
        street: '',
        zip: '',
        phoneNumber: '',
        email: '',
        password: '',
        description: '',
        thumbnail: '',
        gallery: [],
    });
    const [signupError, setSignupError] = useState();
    const navigate = useNavigate();
    const theme = useTheme();
    useEffect(() => {
        (async () => {
            let res = await axios.get(
                'https://countriesnow.space/api/v0.1/countries/iso'
            );
            setCountries(res.data.data);
            setVendorData((prevFormData) => ({
                ...prevFormData,
                country: 'Egypt',
            }));

            res = await axiosInstance.get('api/v1/categories');
            setCategories(res.data.data);
        })();
    }, []);

    useEffect(() => {
        setStates(null);
        setCities(null);
        if (vendorData.country) {
            (async () => {
                const res = await axios.post(
                    'https://countriesnow.space/api/v0.1/countries/states',
                    { country: vendorData.country }
                );
                setStates(res.data.data.states);
                setVendorData((prevFormData) => ({
                    ...prevFormData,
                    state: res.data.data.states[0].name,
                }));
            })();
        }
    }, [vendorData.country]);

    useEffect(() => {
        setCities(null);
        if (vendorData.country && vendorData.state) {
            (async () => {
                const res = await axios.post(
                    'https://countriesnow.space/api/v0.1/countries/state/cities',
                    {
                        country: vendorData.country,
                        state: vendorData.state,
                    }
                );
                setCities(res.data.data);
                setVendorData((prevFormData) => ({
                    ...prevFormData,
                    city: res.data.data[0],
                }));
            })();
        }
    }, [vendorData.state]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVendorData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleInputChangeFile = (event) => {
        setVendorData((prevFormData) => ({
            ...prevFormData,
            thumbnail: event.target.files[0],
        }));
    };
    const handleInputChangeMultipleFiles = (event) => {
        setVendorData((prevFormData) => ({
            ...prevFormData,
            gallery: [...event.target.files],
        }));
    };

    useEffect(() => {
        console.log(vendorData);
    });

    const handleSignup = async () => {
        setLoading(true);
        setSignupError(false);
        setFormErrors({
            firstName: '',
            lastName: '',
            placeName: '',
            category: '',
            country: '',
            state: '',
            city: '',
            street: '',
            zip: '',
            phoneNumber: '',
            email: '',
            password: '',
            description: '',
            thumbnail: '',
            gallery: '',
        });

        let isValid = true;

        // if (vendorData.firstName.length === 0) {
        //     setFormErrors((prevErrors) => ({
        //         ...prevErrors,
        //         firstName: 'First Name Required',
        //     }));
        //     isValid = false;
        // } else if (!vendorData.firstName.match(/^[A-Za-z]+$/)) {
        //     setFormErrors((prevErrors) => ({
        //         ...prevErrors,
        //         firstName: 'Invalid First Name',
        //     }));
        //     isValid = false;
        // }

        // if (vendorData.lastName.length === 0) {
        //     setFormErrors((prevErrors) => ({
        //         ...prevErrors,
        //         lastName: 'Last Name Required',
        //     }));
        //     isValid = false;
        // } else if (!vendorData.lastName.match(/^[A-Za-z]+$/)) {
        //     setFormErrors((prevErrors) => ({
        //         ...prevErrors,
        //         lastName: 'Invalid Last Name',
        //     }));
        //     isValid = false;
        // }

        // if (vendorData.email.length === 0) {
        //     setFormErrors((prevErrors) => ({
        //         ...prevErrors,
        //         email: 'Email Required',
        //     }));
        //     isValid = false;
        // } else if (
        //     !vendorData.email.match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/)
        // ) {
        //     setFormErrors((prevErrors) => ({
        //         ...prevErrors,
        //         email: 'Invalid Email',
        //     }));
        //     isValid = false;
        // }

        // if (vendorData.password.length === 0) {
        //     setFormErrors((prevErrors) => ({
        //         ...prevErrors,
        //         password: 'Password Required',
        //     }));
        //     isValid = false;
        // } else if (
        //     !vendorData.password.match(
        //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/
        //     )
        // ) {
        //     setFormErrors((prevErrors) => ({
        //         ...prevErrors,
        //         password: 'Invalid Password',
        //     }));
        //     isValid = false;
        // }

        if (isValid) {
            try {
                await axiosInstance.post(
                    '/api/v1/auth/vendor/register',
                    vendorData
                );
                navigate('http://localhost:3000/vendor/login');
            } catch (err) {
                console.log(err);
                setSignupError(true);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        if (signupError)
            setTimeout(() => {
                setSignupError(false);
            }, 3 * 1000);
    }, [signupError]);

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
            <Container
                maxWidth="lg"
                className="d-flex justify-content-center align-items-center mt-5"
                style={{
                    minHeight: "calc(100vh - 64px)'",
                }}
            >
                {/* {JSON.stringify(countries.data)} */}
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
                                        Become a Vendor
                                    </Typography>
                                </div>
                            </div>
                            <div className="row">
                                {signupError && (
                                    <div style={{ padding: '.375rem .75rem' }}>
                                        <div className="alert alert-danger col-12">
                                            Sign up failed
                                        </div>
                                    </div>
                                )}
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={vendorData.firstName}
                                        onChange={handleInputChange}
                                    />
                                    <small style={{ color: 'red' }}>
                                        {formErrors.firstName}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={vendorData.lastName}
                                        onChange={handleInputChange}
                                    />
                                    <small style={{ color: 'red' }}>
                                        {formErrors.lastName}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="placeName"
                                        placeholder="Place Name"
                                        value={vendorData.placeName}
                                        onChange={handleInputChange}
                                    />
                                    <small style={{ color: 'red' }}>
                                        {formErrors.placeName}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <select
                                        className="form-control"
                                        name="category"
                                        value={vendorData.category}
                                        onChange={handleInputChange}
                                    >
                                        {categories &&
                                            categories.map((category) => (
                                                <option
                                                    value={category._id}
                                                    key={category._id}
                                                >
                                                    {category.name}
                                                </option>
                                            ))}
                                    </select>
                                    <small style={{ color: 'red' }}>
                                        {formErrors.category}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <select
                                        className="form-control"
                                        name="country"
                                        value={vendorData.country}
                                        onChange={handleInputChange}
                                    >
                                        {countries &&
                                            countries.map((country) => (
                                                <option
                                                    value={country.name}
                                                    key={
                                                        country.name +
                                                        country.iso3
                                                    }
                                                >
                                                    {country.name}
                                                </option>
                                            ))}
                                    </select>
                                    <small style={{ color: 'red' }}>
                                        {formErrors.country}
                                    </small>
                                </div>
                                {states && (
                                    <div className="mb-3">
                                        <select
                                            className="form-control"
                                            name="state"
                                            value={vendorData.state}
                                            onChange={handleInputChange}
                                        >
                                            {states &&
                                                states.map((state) => (
                                                    <option
                                                        value={state.name}
                                                        key={
                                                            state.name +
                                                            state.iso3
                                                        }
                                                    >
                                                        {state.name}
                                                    </option>
                                                ))}
                                        </select>
                                        <small style={{ color: 'red' }}>
                                            {formErrors.state}
                                        </small>
                                    </div>
                                )}
                                {cities && (
                                    <div className="mb-3">
                                        <select
                                            className="form-control"
                                            name="city"
                                            value={vendorData.city}
                                            onChange={handleInputChange}
                                        >
                                            {cities.map((city) => (
                                                <option value={city} key={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                        <small style={{ color: 'red' }}>
                                            {formErrors.city}
                                        </small>
                                    </div>
                                )}
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="street"
                                        placeholder="Street"
                                        value={vendorData.street}
                                        onChange={handleInputChange}
                                    />
                                    <small style={{ color: 'red' }}>
                                        {formErrors.street}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="zip"
                                        placeholder="ZIP"
                                        value={vendorData.zip}
                                        onChange={handleInputChange}
                                    />
                                    <small style={{ color: 'red' }}>
                                        {formErrors.zip}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phoneNumber"
                                        placeholder="Phone Number"
                                        value={vendorData.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                    <small style={{ color: 'red' }}>
                                        {formErrors.phoneNumber}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        placeholder="Description"
                                        value={vendorData.description}
                                        onChange={handleInputChange}
                                    />
                                    <small style={{ color: 'red' }}>
                                        {formErrors.description}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="thumbnail"
                                        placeholder="Thumbnail"
                                        onChange={handleInputChangeFile}
                                    />
                                    <small style={{ color: 'red' }}>
                                        {formErrors.thumbnail}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="gallery"
                                        placeholder="Gallery"
                                        onChange={
                                            handleInputChangeMultipleFiles
                                        }
                                        multiple
                                    />
                                    <small style={{ color: 'red' }}>
                                        {formErrors.gallery}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Email"
                                        value={vendorData.email}
                                        onChange={handleInputChange}
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
                                        value={vendorData.password}
                                        onChange={handleInputChange}
                                    />
                                    <small style={{ color: 'red' }}>
                                        {formErrors.password}
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <Typography variant="p">
                                        Already have an account?{' '}
                                        <Link to="/login">
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
                                            onClick={handleSignup}
                                            className="col-12"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Sign up
                                        </Button>
                                    )}
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

export default VendorRegister;
