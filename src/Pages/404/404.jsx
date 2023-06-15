import {Alert, Snackbar, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Img404 from "../../assets/404.jpeg";
import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";


const Page404 = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    }

    return (
        <div className="container min-vh-100 d-flex flex-column flex-lg-row justify-content-around align-items-center">
            <div className="col-11 col-lg-5 d-flex justify-content-center align-items-center">
                <img className="w-100 h-100 mt-5 mt-lg-0" src={Img404}/>
            </div>
            <div className="col-11 col-lg-5 d-flex flex-column align-items-center align-items-lg-start mb-5 mb-lg-0">
                <Typography className="text-center text-lg-start" style={{color:'#00BBAA'}} variant="h3">Uh Oh..</Typography>
                <Typography className="text-center text-lg-start" variant="h1">Something Went Wrong</Typography>
                <Typography className="text-center text-lg-start" variant="h4">Looks like this page dos'nt exist </Typography>
                <Button onClick={handleClick} className="col-6" variant="contained" color="primary">
                    <FontAwesomeIcon className="me-2" icon={faHouse} />
                    Back to Home
                </Button>
            </div>
        </div>
    )
}

export default Page404