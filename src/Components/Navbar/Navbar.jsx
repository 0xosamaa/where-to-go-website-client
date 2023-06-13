import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import mainLogo from '../../assets/logos/main_logo.svg';

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
                <Link class="navbar-brand" href="#">
                    <img src={mainLogo} alt="Where to go" width={32} />
                </Link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link
                                class="nav-link active"
                                aria-current="page"
                                href="#"
                            >
                                Places to go
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" href="#">
                                Experiences
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" href="#">
                                Discover
                            </Link>
                        </li>
                    </ul>
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <button
                                class="btn btn-light dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Mohammad
                            </button>
                            <ul class="dropdown-menu dropdown-menu-light">
                                <li>
                                    <Link class="dropdown-item" href="#">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link class="dropdown-item" href="#">
                                        History
                                    </Link>
                                </li>
                                <li>
                                    <Link class="dropdown-item" href="#">
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
