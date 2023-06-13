import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Pages/Home/Home';
import Profile from "./Pages/Profile/Profile.jsx";
import SearchResults from './Pages/SearchResults/SearchResults'
import React from 'react';
import VendorDetails from './Pages/VendorDetails/VendorDetails';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/vendor" element={<VendorDetails />} />
                </Route>
                <Route path="/profile" element={<Layout />}>
                    <Route index element={<Profile />} />
                    <Route />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
