import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faLock, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {
    Alert,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Snackbar,
    Typography
} from "@mui/material";
import {useState} from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useDispatch, useSelector} from "react-redux";
import {changePassword} from "../../../Redux/Slices/profileSlice.js";

const Security = () => {
    const dispatch = useDispatch();
    const [oldPassword, setOldPassword] = useState(false);
    const [newPassword, setNewPassword] = useState(false);
    const [conPassword, setConPassword] = useState(false);
    const error = useSelector(state => state.profile.error);
    const [data, setData] = useState({
        currentPassword:'',
        password:'',
        passwordConfirm:''
    });
    const [open, setOpen] = useState(false);

    const handleClickOldPassword = () => setOldPassword((show) => !show);
    const handleClickNewPassword = () => setNewPassword((show) => !show);
    const handleClickConPassword = () => setConPassword((show) => !show);

    const handleMouseDownOldPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownNewPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownConPassword = (event) => {
        event.preventDefault();
    };

    const handleChangePassword = () => {
        dispatch(changePassword(data)).then((res) => {
            if(res.payload.token !== undefined){
                setData({
                    currentPassword:'',
                    password:'',
                    passwordConfirm:''
                })
            }
            handleClick();
        });
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <div className="img-container w-100 d-flex justify-content-between align-items-center">
                <img style={{width:'80px',height:'80px'}} className="rounded-circle" src="https://picsum.photos/200/300" alt="profile" />
            </div>
            <div className="info-container w-100 d-flex align-items-start flex-wrap">
                <div className="info-content-item d-flex gap-3 align-items-center col-11 col-lg-3">
                    <FontAwesomeIcon icon={faLock} />
                    <Typography variant="h4" >Change Password</Typography>
                    <hr/>
                </div>
                <div style={{border:'solid 1px #999', borderRadius:'10px'}} className="form-container d-flex p-5 flex-column gap-5 col-12 col-md-9">
                    <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                        <OutlinedInput
                            value={data.currentPassword}
                            id="outlined-adornment-password"
                            type={oldPassword ? 'text' : 'password'}
                            onChange={(e) => setData({...data,currentPassword:e.target.value})}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickOldPassword}
                                        onMouseDown={handleMouseDownOldPassword}
                                        edge="end"
                                    >
                                        {oldPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Old Password"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            value={data.password}
                            type={newPassword ? 'text' : 'password'}
                            onChange={(e) => setData({...data,password:e.target.value})}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickNewPassword}
                                        onMouseDown={handleMouseDownNewPassword}
                                        edge="end"
                                    >
                                        {newPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="New Password"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            value={data.passwordConfirm}
                            type={conPassword ? 'text' : 'password'}
                            onChange={(e) => setData({...data,passwordConfirm:e.target.value})}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickConPassword}
                                        onMouseDown={handleMouseDownConPassword}
                                        edge="end"
                                    >
                                        {conPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirm Password"
                        />
                    </FormControl>
                    <button onClick={handleChangePassword} className="btn btn-outline-primary w-50">Change Password</button>
                </div>
            </div>
            <div className="info-container w-100 d-flex align-items-start flex-wrap">
                <div className="info-content-item d-flex gap-3 align-items-center col-11 col-lg-3">
                    <FontAwesomeIcon icon={faBan} />
                    <Typography variant="h4" >Activate/Deactivate</Typography>
                    <hr/>
                </div>
                <div style={{border:'solid 1px #999', borderRadius:'10px'}} className="form-container d-flex p-5 justify-content-around gap-5 col-12 col-md-9">
                    <Typography variant="h5">Deactivate</Typography>
                    <button className="btn btn-outline-danger w-50">Deactivate</button>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={error === null? "success" : "error"} sx={{ width: '100%' }}>
                    {error === null ? "Password Changed Successfully" : error.errors[0].msg}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Security