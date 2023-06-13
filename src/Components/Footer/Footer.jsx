import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const [year, setYear] = useState(null);
    useEffect(() => {
        const year = new Date().getFullYear();
        setYear(year);
    }, []);

    return (
        <footer>
            <div className="container">
                <div className="row text-center">
                    <div className="col-12 col-lg-4">
                        <div className="row">
                            <div className="col-12 col-lg-6">About</div>
                            <div className="col-12 col-lg-6">Contact</div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-flex justify-content-center align-items-center">
                        <Link>
                            <FontAwesomeIcon
                                icon={faFacebook}
                                size="lg"
                                color="#00bbaa"
                                className="me-3"
                            />
                        </Link>
                        <Link>
                            <FontAwesomeIcon
                                icon={faInstagram}
                                size="lg"
                                color="#00bbaa"
                                className="me-3"
                            />
                        </Link>
                        <Link>
                            <FontAwesomeIcon
                                icon={faTwitter}
                                size="lg"
                                color="#00bbaa"
                                className="me-3"
                            />
                        </Link>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="row">
                            <div className="col-12 col-lg-6">About</div>
                            <div className="col-12 col-lg-6">Contact</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyrights">
                All rights reserved - &copy; Where to go {year}
            </div>
        </footer>
    );
};

export default Footer;
