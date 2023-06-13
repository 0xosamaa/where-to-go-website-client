import {Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";


const Info = ({handleClickOpen}) => {
    return (
        <>
            <div className="img-container w-100 d-flex justify-content-between align-items-center">
                <img style={{width:'80px',height:'80px'}} className="rounded-circle" src="https://picsum.photos/200/300" alt="profile" />
                <Button style={{width:'60px',height:'60px'}} onClick={handleClickOpen} variant="outlined" className="rounded-circle">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
            </div>
            <div className="info-container w-100 d-flex flex-wrap">
                <div className="info-content-item col-11 col-md-6">
                    <div className="info-content-item-title">
                        <Typography variant="h4" >First Name</Typography>
                    </div>
                    <div className="info-content-item-content">
                        <Typography variant="p" >John</Typography>
                    </div>
                    <hr/>
                </div>
                <div className="info-content-item col-11 col-md-6">
                    <div className="info-content-item-title">
                        <Typography variant="h4" >Last Name</Typography>
                    </div>
                    <div className="info-content-item-content">
                        <Typography variant="p" >Doe</Typography>
                    </div>
                    <hr/>
                </div>
                <div className="info-content-item col-11 col-md-6">
                    <div className="info-content-item-title">
                        <Typography variant="h4" >Email</Typography>
                    </div>
                    <div className="info-content-item-content">
                        <Typography variant="p" >John.Doe@gmail.com</Typography>
                    </div>
                    <hr/>
                </div>
                <div className="info-content-item col-11 col-md-6">
                    <div className="info-content-item-title">
                        <Typography variant="h4" >Gender</Typography>
                    </div>
                    <div className="info-content-item-content">
                        <Typography variant="p" >Male</Typography>
                    </div>
                    <hr/>
                </div>
                <div className="info-content-item col-11 col-md-6">
                    <div className="info-content-item-title">
                        <Typography variant="h4" >Date Of Birth</Typography>
                    </div>
                    <div className="info-content-item-content">
                        <Typography variant="p" >22-06-1998</Typography>
                    </div>
                    <hr/>
                </div>
                <div className="info-content-item col-11 col-md-6">
                    <div className="info-content-item-title">
                        <Typography variant="h4" >Phone Number</Typography>
                    </div>
                    <div className="info-content-item-content">
                        <Typography variant="p" >16565623285626</Typography>
                    </div>
                    <hr/>
                </div>
                <div className="info-content-item col-11 col-md-6">
                    <div className="info-content-item-title">
                        <Typography variant="h4" >Country</Typography>
                    </div>
                    <div className="info-content-item-content">
                        <Typography variant="p" >Egypt</Typography>
                    </div>
                    <hr/>
                </div>
                <div className="info-content-item col-11 col-md-6">
                    <div className="info-content-item-title">
                        <Typography variant="h4" >State</Typography>
                    </div>
                    <div className="info-content-item-content">
                        <Typography variant="p" >Anything</Typography>
                    </div>
                    <hr/>
                </div>
                <div className="info-content-item col-11 col-md-6">
                    <div className="info-content-item-title">
                        <Typography variant="h4" >City</Typography>
                    </div>
                    <div className="info-content-item-content">
                        <Typography variant="p" >Mansoura</Typography>
                    </div>
                    <hr/>
                </div>
                <div className="info-content-item col-11 col-md-6">
                    <div className="info-content-item-title">
                        <Typography variant="h4" >Street</Typography>
                    </div>
                    <div className="info-content-item-content">
                        <Typography variant="p" >Anything</Typography>
                    </div>
                    <hr/>
                </div>
                <div className="info-content-item col-11 col-md-6">
                    <div className="info-content-item-title">
                        <Typography variant="h4" >Active</Typography>
                    </div>
                    <div className="info-content-item-content">
                        <Typography variant="p" >True</Typography>
                    </div>
                    <hr/>
                </div>
                <div className="info-content-item col-11 col-md-6">
                    <div className="info-content-item-title">
                        <Typography variant="h4" >Banned</Typography>
                    </div>
                    <div className="info-content-item-content">
                        <Typography variant="p" >False</Typography>
                    </div>
                    <hr/>
                </div>
            </div>
        </>
    )
}

export default Info