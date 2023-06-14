import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faStar, faUserTie} from "@fortawesome/free-solid-svg-icons";
import {Alert, Snackbar, Typography} from "@mui/material";
import Info from "./Info/Info.jsx";
import Security from "./Security/Security.jsx";
import Edit from "./Edit/Edit.jsx";
import "./profile.css";
import {useSelector, useDispatch} from "react-redux";
import {getCustomer} from "../../Redux/Slices/profileSlice.js";
import Preference from "./preference/Preference.jsx";

const Profile = () => {
    const dispatch = useDispatch();
    const [active,setActive] = useState('Info');
    const [opens, setOpens] = useState(false);
    const [open, setOpen] = React.useState(false);
    const error = useSelector(state => state.profile.error);

    const customer = useSelector(state => state.profile.customer);

    useEffect(() => {
        dispatch(getCustomer()).then((res) => {
            console.log(res);
        });
    },[])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        setOpens(true);
    };

    const handleCloseA = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpens(false);
    };

    return (
        <div style={{paddingTop:"70px"}} className="container gap-5 pt-5 min-vh-100 d-flex flex-column flex-lg-row justify-content-lg-between align-items-lg-start justify-content-sm-center align-items-sm-center">
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
                    active === 'Info' ? <Info handleClickOpen={handleClickOpen} /> : active === 'Security' ? <Security /> : <Preference />
                }
            </div>
            <Edit open={open} handleOpens={handleClick} handleClickOpen={handleClickOpen} handleClose={handleClose} />
            <Snackbar open={opens} autoHideDuration={6000} onClose={handleCloseA}>
                <Alert onClose={handleCloseA} severity={error === null? "success" : "error"} sx={{ width: '100%' }}>
                    {error === null ? "Data Updated Successfully" : error.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Profile