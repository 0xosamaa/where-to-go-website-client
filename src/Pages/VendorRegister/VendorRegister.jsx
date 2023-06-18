import { Container, Typography, Button, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiseLoader } from 'react-spinners';

import registerIll from '../../assets/images/register/register-ill.png';
import axiosInstance, { axiosInstanceFormData } from '../../Axios';
import axios from 'axios';
import SecNavbar from '../../Components/SecNavbar/SecNavbar';

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

    const handleSignup = async (e) => {
        e.preventDefault();
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
            description: '',
            thumbnail: '',
            gallery: '',
        });

        let isValid = true;

        if (vendorData.firstName.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                firstName: 'First Name Required',
            }));
            isValid = false;
        } else if (!vendorData.firstName.match(/^[A-Za-z]+$/)) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                firstName: 'Invalid First Name',
            }));
            isValid = false;
        }

        if (vendorData.lastName.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                lastName: 'Last Name Required',
            }));
            isValid = false;
        } else if (!vendorData.lastName.match(/^[A-Za-z]+$/)) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                lastName: 'Invalid Last Name',
            }));
            isValid = false;
        }

        if (vendorData.placeName.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                placeName: 'Place Name Required',
            }));
            isValid = false;
        }

        if (vendorData.category.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                category: 'Category Required',
            }));
            isValid = false;
        }

        if (vendorData.country.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                country: 'Country Required',
            }));
            isValid = false;
        }

        if (vendorData.state.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                state: 'State Required',
            }));
            isValid = false;
        }

        if (vendorData.city.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                city: 'City Required',
            }));
            isValid = false;
        }

        if (vendorData.street.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                street: 'Street Required',
            }));
            isValid = false;
        }

        if (vendorData.zip.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                zip: 'Zip Code Required',
            }));
            isValid = false;
        }

        if (vendorData.phoneNumber.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                phoneNumber: 'Phone Number Required',
            }));
            isValid = false;
        } else if (
            !vendorData.phoneNumber.match(
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
            )
        ) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                phoneNumber: 'Invalid Phone Number',
            }));
            isValid = false;
        }
        if (vendorData.description.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                description: 'Description Required',
            }));
            isValid = false;
        }

        if (vendorData.thumbnail.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                thumbnail: 'Thumbnail Required',
            }));
            isValid = false;
        }

        if (vendorData.gallery.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                gallery: 'Gallery Required',
            }));
            isValid = false;
        }

        if (vendorData.email.length === 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Email Required',
            }));
            isValid = false;
        } else if (
            !vendorData.email.match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/)
        ) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Invalid Email',
            }));
            isValid = false;
        }

        if (isValid) {
            try {
                const data = new FormData(e.target);
                console.log(data.get('thumbnail'));
                console.log(data.get('gallery'));
                await axiosInstanceFormData.post(
                    '/api/v1/auth/vendor/register',
                    data
                );
                navigate('http://localhost:3000/vendor/login');
            } catch (err) {
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
            <SecNavbar />
            <Container
                maxWidth="lg"
                className="d-flex justify-content-center align-items-center my-5"
                style={{
                    minHeight: 'calc(100vh - 64px)',
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
                            <form
                                onSubmit={handleSignup}
                                className="row"
                                encType="multipart/form-data"
                            >
                                {signupError && (
                                    <div
                                        style={{
                                            padding: '.375rem .75rem',
                                        }}
                                    >
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
                                    <label>Category</label>
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
                                    <label>Country</label>
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
                                        <label>State</label>
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
                                        <label>City</label>
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
                                    <Typography variant="p">
                                        Already have an account?{' '}
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
                                            type="submit"
                                            className="col-12"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Sign up
                                        </Button>
                                    )}
                                </div>
                            </form>
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
