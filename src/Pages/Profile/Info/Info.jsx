import {Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import {useTheme} from "@mui/material/styles";
import RiseLoader from "react-spinners/RiseLoader";

const Info = ({handleClickOpen}) => {
    const customer = useSelector(state => state.profile.customer);
    const loading = useSelector(state => state.profile.loading);
    const theme = useTheme();

    const override = {
        display: "block",
        margin: "30vh auto",
    };

    return (
        <>
            {loading? (
                    <RiseLoader
                        color={theme.palette.primary.main}
                        loading={loading}
                        cssOverride={override}
                        size={25}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
            ):(
                <>
                    <div className="img-container mt-lg-5 pt-lg-5 w-100 d-flex justify-content-between align-items-center">
                        <img style={{width:'80px',height:'80px'}} className="rounded-circle" src={customer.image? `http://localhost:8001/api/v1/images/customers/${customer.image}` :"https://picsum.photos/200/300"} alt="profile" />
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
                                <Typography variant="p" >{customer.firstName}</Typography>
                            </div>
                            <hr/>
                        </div>
                        <div className="info-content-item col-11 col-md-6">
                            <div className="info-content-item-title">
                                <Typography variant="h4" >Last Name</Typography>
                            </div>
                            <div className="info-content-item-content">
                                <Typography variant="p" >{customer.lastName}</Typography>
                            </div>
                            <hr/>
                        </div>
                        <div className="info-content-item col-11 col-md-6">
                            <div className="info-content-item-title">
                                <Typography variant="h4" >Email</Typography>
                            </div>
                            <div className="info-content-item-content">
                                <Typography variant="p" >{customer.email}</Typography>
                            </div>
                            <hr/>
                        </div>
                        <div className="info-content-item col-11 col-md-6">
                            <div className="info-content-item-title">
                                <Typography variant="h4" >Gender</Typography>
                            </div>
                            <div className="info-content-item-content">
                                <Typography variant="p" >{customer.gender || 'Gender Not Set Uet'}</Typography>
                            </div>
                            <hr/>
                        </div>
                        <div className="info-content-item col-11 col-md-6">
                            <div className="info-content-item-title">
                                <Typography variant="h4" >Date Of Birth</Typography>
                            </div>
                            <div className="info-content-item-content">
                                <Typography variant="p" >{customer.dateOfBirth || 'BirthDay Not Set Yet'}</Typography>
                            </div>
                            <hr/>
                        </div>
                        <div className="info-content-item col-11 col-md-6">
                            <div className="info-content-item-title">
                                <Typography variant="h4" >Phone Number</Typography>
                            </div>
                            <div className="info-content-item-content">
                                <Typography variant="p" >{customer.phoneNumber || 'Phone Number Nit Set Yet'}</Typography>
                            </div>
                            <hr/>
                        </div>
                        <div className="info-content-item col-11 col-md-6">
                            <div className="info-content-item-title">
                                <Typography variant="h4" >Country</Typography>
                            </div>
                            <div className="info-content-item-content">
                                <Typography variant="p" >{customer.address?.country || 'Address Not Set Yet'}</Typography>
                            </div>
                            <hr/>
                        </div>
                        <div className="info-content-item col-11 col-md-6">
                            <div className="info-content-item-title">
                                <Typography variant="h4" >State</Typography>
                            </div>
                            <div className="info-content-item-content">
                                <Typography variant="p" >{customer.address?.state || 'Address Not Set Yet'}</Typography>
                            </div>
                            <hr/>
                        </div>
                        <div className="info-content-item col-11 col-md-6">
                            <div className="info-content-item-title">
                                <Typography variant="h4" >City</Typography>
                            </div>
                            <div className="info-content-item-content">
                                <Typography variant="p" >{customer.address?.city || 'Address Not Set Yet'}</Typography>
                            </div>
                            <hr/>
                        </div>
                        <div className="info-content-item col-11 col-md-6">
                            <div className="info-content-item-title">
                                <Typography variant="h4" >Street</Typography>
                            </div>
                            <div className="info-content-item-content">
                                <Typography variant="p" >{customer.address?.street || 'Address Not Set Yet'}</Typography>
                            </div>
                            <hr/>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Info