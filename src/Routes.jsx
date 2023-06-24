import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Profile from './Pages/Profile/Profile.jsx';
import SearchResults from './Pages/SearchResults/SearchResults';
import React from 'react';
import PlaceDetails from './Pages/PlaceDetails/PlaceDetails';
import ContactUs from './Pages/ContactUs/ContactUs.jsx';
import Page404 from './Pages/404/404.jsx';
import VendorRegister from './Pages/VendorRegister/VendorRegister';
import AboutUs from './Pages/About/About';
import Privacy from './Pages/Privacy/Privacy';
import Terms from './Pages/Terms/Terms';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import VerifyResetCode from './Pages/ForgotPassword/VerifyResetCode';
import ResetPassword from './Pages/ForgotPassword/ResetPassword';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/vendor/register" element={<VendorRegister />} />
                <Route path="/vendor/forgotPassword" element={<ForgotPassword />} />
                <Route path="/vendor/verifyResetCode" element={<VerifyResetCode />} />
                <Route path="/vendor/resetPassword" element={<ResetPassword />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/place/:id" element={<PlaceDetails />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="*" element={<Page404 />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
