import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import './Footer.css';
import { Typography, Container } from '@mui/material';

const Footer = () => {
    const theme = useTheme();
    const mainColor = theme.palette.primary.main;
    const [year, setYear] = useState(null);
    useEffect(() => {
        const year = new Date().getFullYear();
        setYear(year);
    }, []);

    return (
        <footer className="mt-5">
            <Container maxWidth="lg">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center py-3">
                    <div className="d-flex mb-4 mb-md-0">
                        <Typography variant="h6" className="mx-5 mx-md-0">
                            <Link to='/aboutus'> ABOUT </Link>
                        </Typography>
                        <Typography
                            variant="h6"
                            className="mx-5 mx-md-0 ms-md-5 ps-md-5"
                        >
                            <Link to='/contactus'> CONTACT </Link>
                        </Typography>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <Link>
                            <FontAwesomeIcon
                                icon={faFacebook}
                                size="lg"
                                color={mainColor}
                                className="mx-2"
                            />
                        </Link>
                        <Link>
                            <FontAwesomeIcon
                                icon={faInstagram}
                                size="lg"
                                color={mainColor}
                                className="mx-2"
                            />
                        </Link>
                        <Link>
                            <FontAwesomeIcon
                                icon={faTwitter}
                                size="lg"
                                color={mainColor}
                                className="mx-2"
                            />
                        </Link>
                    </div>
                    <div className="d-flex mt-4 mt-md-0">
                        <Typography
                            variant="h6"
                            className="mx-5 mx-md-0 me-md-5 pe-md-5"
                        >
                            <Link to='/privacy'> PRIVACY </Link>
                        </Typography>
                        <Typography variant="h6" className="mx-5 mx-md-0">
                        <Link to='/terms'> TERMS </Link>
                        </Typography>
                    </div>
                </div>
                <hr
                    className="mb-0 mt-4"
                    style={{ color: '#bcc1ca', width: '100%', borderWidth: 2 }}
                />
                <div className="copyrights">
                    All rights reserved - &copy; Where to go {year}
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
