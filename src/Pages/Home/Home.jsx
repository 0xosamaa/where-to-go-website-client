import React, {useEffect,useState} from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Container, useTheme } from '@mui/material';
import Slider from '../../Components/Slider/Slider';
import Header from '../../Components/Header/Header';
import top1 from '../../assets/images/places/top-rated/top-rated-1.jpeg';
import top2 from '../../assets/images/places/top-rated/top-rated-2.jpeg';
import top3 from '../../assets/images/places/top-rated/top-rated-3.jpeg';
import top4 from '../../assets/images/places/top-rated/top-rated-4.jpeg';
import hotels from '../../assets/images/places/categories/hotels.jpeg';
import restaurants from '../../assets/images/places/categories/restaurants.jpeg';
import openPlaces from '../../assets/images/places/categories/open-places.jpeg';
import parks from '../../assets/images/places/categories/parks.jpeg';
import axios from "axios";

const Home = () => {
    const theme = useTheme();
    const [topRated, setTopRated] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8001/api/v1/auth/topRated")
            .then((res) => {
                setTopRated(res.data.data);
            })
            .catch((err) => {
                navigate('/500')
            })
    }, [])

    return (
        <>
            <Header />
            <Container maxWidth="lg" className="top-rated my-5">
                <div className="row">
                    <div className="col-12 my-3 text-center text-lg-start">
                        <Typography variant="h3" color={theme.palette.primary.main}>
                            Top Rated
                        </Typography>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-3 mb-5">
                        <Link to={`/place/${topRated[0]?._id}`}>
                            <div className="row">
                                <div className="col-12">
                                    <img src={topRated[0]?.thumbnail ? `http://localhost:8001/api/v1/images/vendors/${topRated[0].thumbnail}` : top1} alt="" className="mb-2" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-start">
                                    <Typography color="primary" variant="p" fontWeight={'bold'}>
                                        {topRated[0]?.placeName}
                                    </Typography>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-12 col-lg-3 mb-5">
                        <Link to={`/place/${topRated[1]?._id}`}>
                            <div className="row">
                                <div className="col-12">
                                    <img src={topRated[1]?.thumbnail ? `http://localhost:8001/api/v1/images/vendors/${topRated[1].thumbnail}` : top2} alt="" className="mb-2" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-start">
                                    <Typography color="primary" variant="p" fontWeight={'bold'}>
                                        {topRated[1]?.placeName}
                                    </Typography>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-12 col-lg-3 mb-5">
                        <Link to={`/place/${topRated[2]?._id}`}>
                            <div className="row">
                                <div className="col-12">
                                    <img src={topRated[2]?.thumbnail ? `http://localhost:8001/api/v1/images/vendors/${topRated[2].thumbnail}` : top3} alt="" className="mb-2" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-start">
                                    <Typography color="primary" variant="p" fontWeight={'bold'}>
                                        {topRated[2]?.placeName}
                                    </Typography>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-12 col-lg-3 mb-5">
                        <Link to={`/place/${topRated[3]?._id}`}>
                            <div className="row">
                                <div className="col-12">
                                    <img src={topRated[3]?.thumbnail ? `http://localhost:8001/api/v1/images/vendors/${topRated[3].thumbnail}` : top4} alt="" className="mb-2" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Typography color="primary" variant="p" fontWeight={'bold'}>
                                        {topRated[3]?.placeName}
                                    </Typography>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </Container>
            {/* <Slider /> */}
            <Container maxWidth="lg" className="categories mb-5">
                <div className="row">
                    <div className="col-12 text-center text-lg-start my-3">
                        <Typography variant="h3" color="primary">
                            Categories
                        </Typography>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4 mb-5 mb-lg-0 category">
                        <Link to="/search">
                            <img src={hotels} alt="" />
                            <Typography variant="h4">Hotels</Typography>
                        </Link>
                    </div>
                    <div className="col-12 col-lg-4 d-flex flex-column justify-content-between">
                        <div className="row">
                            <div className="col-12 mb-5 mb-lg-0 category">
                                <Link to="/search">
                                    <img src={restaurants} alt="" />
                                    <Typography variant="h4">
                                        Restaurants
                                    </Typography>
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mb-5 mb-lg-0 category">
                                <Link to="/search">
                                    <img src={openPlaces} alt="" />
                                    <Typography variant="h4">
                                        Open Places
                                    </Typography>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 mb-5 mb-lg-0 category">
                        <Link to="/search">
                            <img src={parks} alt="" />
                            <Typography variant="h4">Parks</Typography>
                        </Link>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Home;
