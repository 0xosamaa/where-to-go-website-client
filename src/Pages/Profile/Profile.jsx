import React, {useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faStar, faUserTie} from "@fortawesome/free-solid-svg-icons";
import {Typography} from "@mui/material";
import Info from "./Info/Info.jsx";
import Security from "./Security/Security.jsx";
import Edit from "./Edit/Edit.jsx";
import "./profile.css";

const Profile = () => {
    const [active,setActive] = useState('Info');

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="container gap-5 pt-5 min-vh-100 d-flex flex-column flex-lg-row justify-content-lg-between align-items-lg-baseline justify-content-sm-center align-items-sm-center">
            <div className="sidebar pt-5 d-flex flex-column align-items-center gap-5 col-12 col-md-6 col-lg-3">
                <Typography variant="h1" className="text-center">Account Settings</Typography>
                <div style={{border:'solid 1px #999', borderRadius:'10px'}} className="controls p-3 d-flex flex-column gap-5 w-100">
                    <div
                        style={{color:(active === 'Info' ? '#00BBAA' : '#555')}}
                        className="control d-flex align-items-center gap-3"
                        onClick={() => setActive('Info')}
                    >
                        <FontAwesomeIcon size={"xl"} icon={faUserTie} />
                        <Typography variant="h4" className="text-center">Personal Info</Typography>
                    </div>
                    <div
                        style={{color:(active === 'Security' ? '#00BBAA' : '#555')}}
                        className="control d-flex align-items-center gap-3"
                        onClick={() => setActive('Security')}
                    >
                        <FontAwesomeIcon size={"xl"} icon={faLock} />
                        <Typography variant="h4" className="text-center">Security</Typography>
                    </div>
                    <div
                        style={{color:(active === 'Preference' ? '#00BBAA' : '#555')}}
                        className="control d-flex align-items-center gap-3"
                        onClick={() => setActive('Preference')}
                    >
                        <FontAwesomeIcon size={"xl"} icon={faStar} />
                        <Typography variant="h4" className="text-center">Preference</Typography>
                    </div>
                </div>
            </div>
            <div className="main pt-5 d-flex flex-column ps-lg-5 ms-5 align-items-start gap-5 w-75">
                {
                    active === 'Info' ? <Info handleClickOpen={handleClickOpen} /> : active === 'Security' ? <Security /> : <div>Preference</div>
                }
            </div>
            <Edit open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
        </div>
    )
}

export default Profile