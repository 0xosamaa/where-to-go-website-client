import React, {useEffect,useState} from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Container, useTheme, Rating, styled } from '@mui/material';
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
import FavouriteIcon from "../../Components/FavouriteIcon/FavouriteIcon";
import axios from "axios";
import { useSelector } from 'react-redux';

const Home = () => {
    const theme = useTheme();
    const favoriteVendors = useSelector((state) => state.profile.favoriteVendors);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [topRated, setTopRated] = useState([]);
    const navigate = useNavigate();
    
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: theme.palette.primary.main,
        },
        '& .MuiRating-iconHover': {
            color: '#ff3d47',
        },
    });

    useEffect(() => {
        axios.get("http://localhost:8001/api/v1/auth/topRated")
            .then((res) => {
                setTopRated(res.data.data);
                console.log(res.data.data);
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
                    <div className="col-12 col-md-6 col-lg-3">
                    {topRated.map((place) => {
                        return (
                            <>
                                <Link to={`/place/${place?._id}`}>
                                    <img src={place?.thumbnail ? `http://localhost:8001/api/v1/images/vendors/${place.thumbnail}` : top1} alt="" className="mb-2" />
                                    <div className="px-2 d-flex flex-column align-items-start">
                                        <Typography color="primary" variant="h3" fontWeight={'bold'} style={{ paddingBottom: 0 }}>
                                            {place?.placeName}
                                        </Typography>
                                        <Typography color="GrayText" variant="h5" fontWeight={'bold'}>
                                            {place?.category[0].name}
                                        </Typography>
                                    </div>
                                </Link>
                                <div className="d-flex justify-content-between align-items-center p-2">
                                    <div className="d-flex">
                                        <StyledRating
                                        size="small"
                                        name="half-rating"
                                        defaultValue={place?.avgRate}
                                        precision={0.5}
                                        readOnly
                                        />
                                        <span className="ms-2">{place?.avgRate?.toFixed(1)}</span>
                                    </div>
                                    {isLoggedIn && (
                                        <FavouriteIcon vendorId={place?._id} checked={favoriteVendors.filter((vendor) => vendor._id === place?._id).length > 0} />
                                    )}
                                </div>
                            </>
                        )
                    })}
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
