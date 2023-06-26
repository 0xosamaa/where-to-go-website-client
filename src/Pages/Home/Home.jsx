import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Slider from '../../Components/Slider/Slider';
import { useDispatch, useSelector } from 'react-redux';
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
import FavouriteIcon from '../../Components/FavouriteIcon/FavouriteIcon';

const Home = () => {
    const theme = useTheme();
    const favoriteVendors = useSelector(
        (state) => state.profile.favoriteVendors
    );
    const [topRated, setTopRated] = useState([]);
    const [nearby, setNearby] = useState([]);
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: theme.palette.primary.main,
        },
        '& .MuiRating-iconHover': {
            color: '#ff3d47',
        },
    });

    useEffect(() => {
        axios
            .get('http://localhost:8001/api/v1/auth/topRated')
            .then((res) => {
                setTopRated(res.data.data);
                console.log(res.data.data);
            })
            .catch((err) => {
                navigate('/500');
            });
    }, []);

    useEffect(() => {
        if (!isLoggedIn) return;

        const token = localStorage.getItem('token');
        (async () => {
            const res = await axios.get(
                'http://localhost:8001/api/v1/customers/getMe',
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const user = res.data.data;

            setNearby(
                topRated.filter((place) => {
                    return (
                        place.address.city.toLowerCase() ===
                        user.address.city.toLowerCase()
                    );
                })
            );
        })();
    }, [isLoggedIn, topRated]);

    return (
        <>
            <Header />
            <Container maxWidth="lg" className="top-rated my-5">
                <div className="row">
                    <div className="col-12 my-3 text-center text-lg-start">
                        <Typography
                            variant="h3"
                            color={theme.palette.primary.main}
                        >
                            Top Rated
                        </Typography>
                    </div>
                </div>
                <div className="row">
                    {/* <div className="col-12 col-lg-3 mb-5">
                        <Link to={`/place/${topRated[0]?._id}`}>
                            <div className="row">
                                <div className="col-12">
                                    <img
                                        src={
                                            topRated[0]?.thumbnail
                                                ? `http://localhost:8001/api/v1/images/vendors/${topRated[0].thumbnail}`
                                                : top1
                                        }
                                        alt=""
                                        className="mb-2"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-start">
                                    <Typography
                                        color="primary"
                                        variant="p"
                                        fontWeight={'bold'}
                                    >
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
                                    <img
                                        src={
                                            topRated[1]?.thumbnail
                                                ? `http://localhost:8001/api/v1/images/vendors/${topRated[1].thumbnail}`
                                                : top2
                                        }
                                        alt=""
                                        className="mb-2"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-start">
                                    <Typography
                                        color="primary"
                                        variant="p"
                                        fontWeight={'bold'}
                                    >
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
                                    <img
                                        src={
                                            topRated[2]?.thumbnail
                                                ? `http://localhost:8001/api/v1/images/vendors/${topRated[2].thumbnail}`
                                                : top3
                                        }
                                        alt=""
                                        className="mb-2"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-start">
                                    <Typography
                                        color="primary"
                                        variant="p"
                                        fontWeight={'bold'}
                                    >
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
                                    <img
                                        src={
                                            topRated[3]?.thumbnail
                                                ? `http://localhost:8001/api/v1/images/vendors/${topRated[3].thumbnail}`
                                                : top4
                                        }
                                        alt=""
                                        className="mb-2"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Typography
                                        color="primary"
                                        variant="p"
                                        fontWeight={'bold'}
                                    >
                                        {topRated[3]?.placeName}
                                    </Typography>
                                </div>
                            </div>
                        </Link>
                    </div> */}

                    {topRated.map((place) => {
                        return (
                            <div className="col-12 col-md-6 col-lg-3">
                                <Link to={`/place/${place?._id}`}>
                                    <img
                                        src={
                                            place?.thumbnail
                                                ? `http://localhost:8001/api/v1/images/vendors/${place.thumbnail}`
                                                : top1
                                        }
                                        alt=""
                                        className="mb-2"
                                    />
                                    <div className="px-2 d-flex flex-column align-items-start">
                                        <Typography
                                            color="primary"
                                            variant="h3"
                                            fontWeight={'bold'}
                                            style={{ paddingBottom: 0 }}
                                        >
                                            {place?.placeName}
                                        </Typography>
                                        <Typography
                                            color="GrayText"
                                            variant="h5"
                                            fontWeight={'bold'}
                                        >
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
                                        <span className="ms-2">
                                            {place?.avgRate?.toFixed(1)}
                                        </span>
                                    </div>
                                    {isLoggedIn && (
                                        <FavouriteIcon
                                            vendorId={place?._id}
                                            checked={
                                                favoriteVendors.filter(
                                                    (vendor) =>
                                                        vendor._id ===
                                                        place?._id
                                                ).length > 0
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
            {/* <Slider /> */}

            {isLoggedIn && nearby.length !== 0 && (
                <Container maxWidth="lg" className="nearby mb-5">
                    <div className="row">
                        <div className="col-12 my-3 text-center text-lg-start">
                            <Typography
                                variant="h3"
                                color={theme.palette.primary.main}
                            >
                                Places near you
                            </Typography>
                        </div>
                    </div>
                    <div className="row">
                        {nearby.map((place) => {
                            return (
                                <div className="col mb-5">
                                    <Link
                                        to={`/place/${place?._id}`}
                                        key={place._id}
                                    >
                                        <div className="row">
                                            <div className="col-12">
                                                <img
                                                    src={
                                                        place?.thumbnail
                                                            ? `http://localhost:8001/api/v1/images/vendors/${place.thumbnail}`
                                                            : top1
                                                    }
                                                    alt=""
                                                    className="mb-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 text-start">
                                                <Typography
                                                    color="primary"
                                                    variant="p"
                                                    fontWeight={'bold'}
                                                >
                                                    {place?.placeName}
                                                </Typography>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            )}
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
                        <Link to="/search?category=6493eb34c5cc45a283457272">
                            <img src={hotels} alt="" />
                            <Typography variant="h4">Hotels</Typography>
                        </Link>
                    </div>
                    <div className="col-12 col-lg-4 d-flex flex-column justify-content-between">
                        <div className="row">
                            <div className="col-12 mb-5 mb-lg-0 category">
                                <Link to="/search?category=6493eb28c5cc45a283457270">
                                    <img src={restaurants} alt="" />
                                    <Typography variant="h4">
                                        Restaurants
                                    </Typography>
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mb-5 mb-lg-0 category">
                                <Link to="/search?category=6486712c37188049f87c1746">
                                    <img src={openPlaces} alt="" />
                                    <Typography variant="h4">
                                        Out Door
                                    </Typography>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 mb-5 mb-lg-0 category">
                        <Link to="/search?category=6493eb5ac5cc45a283457276">
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
