import React from 'react';
import './Header.css';
import header1 from '../../assets/images/places/header/header-1.jpeg';
import { Typography, Container } from '@mui/material';

const Header = () => {
    return (
        <header className="my-5">
            <Container maxWidth="lg">
                <div
                    id="carouselExampleCaptions"
                    className="carousel slide"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    </div>
                    <div className="carousel-inner">
                        <div
                            className="carousel-item active"
                            style={{
                                backgroundImage: `url(${header1})`,
                            }}
                        >
                            <div className="carousel-caption">
                                <Typography variant="h1">
                                    Awaken to a different world
                                </Typography>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit.
                                </p>
                            </div>
                        </div>
                        <div
                            className="carousel-item"
                            style={{
                                backgroundImage: `url(${header1})`,
                            }}
                        >
                            <div className="carousel-caption">
                                <Typography variant="h1">
                                    Awaken to a different world
                                </Typography>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit.
                                </p>
                            </div>
                        </div>
                        <div
                            className="carousel-item"
                            style={{
                                backgroundImage: `url(${header1})`,
                            }}
                        >
                            <div className="carousel-caption">
                                <Typography variant="h1">
                                    Awaken to a different world
                                </Typography>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button> */}
                </div>
            </Container>
        </header>
    );
};

export default Header;
