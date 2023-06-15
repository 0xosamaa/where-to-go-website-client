import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Pages/Home/Home';
import Profile from "./Pages/Profile/Profile.jsx";
import SearchResults from './Pages/SearchResults/SearchResults'
import React from 'react';
import PlaceDetails from './Pages/PlaceDetails/PlaceDetails';
import ContactUs from "./Pages/ContactUs/ContactUs.jsx";
import Page404 from "./Pages/404/404.jsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/place" element={<PlaceDetails />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="*" element={<Page404 />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
