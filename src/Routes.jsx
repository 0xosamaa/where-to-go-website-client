import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Pages/Home/Home';
import Profile from "./Pages/Profile/Profile.jsx";
import SearchResults from './Pages/SearchResults/SearchResults'
import React from 'react';
import PlaceDetails from './Pages/PlaceDetails/PlaceDetails';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/place" element={<PlaceDetails />} />
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
