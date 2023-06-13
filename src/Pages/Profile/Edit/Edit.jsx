import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {TextField} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const genders = [
    {
        value:"Male",
        label:"Male"
    },
    {
        value:"Female",
        label:"Female"
    }
]

const Edit = ({handleClickOpen, handleClose, open}) => {
    const [dateOfBirth, setDateOfBirth] = React.useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let date = new Date(dateOfBirth).toLocaleDateString();
        date = date.split('/');
        date = date[2] + '-' + date[0] + '-' + date[1];
        let data = new FormData(e.target);
        data.set('dateOfBirth', date);
        console.log(data.get('image'));
    }

    const handleDateChange = (date) => {
        setDateOfBirth(date);
    }

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Edit You Profile
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className="container d-flex justify-content-center w-100 mt-5 p-5 align-items-center">
                    <form onSubmit={handleSubmit} className="w-100 d-flex justify-content-center flex-column gap-5 align-items-center" action="">
                        <div className="row d-flex justify-content-around justify-content-lg-between gap-4 w-75">
                            <TextField className="col-11 col-lg-5" id="outlined-basic" name="firstName" label="First Name" variant="outlined" />
                            <TextField className="col-11 col-lg-6" id="outlined-basic" name="lastName" label="Last Name" variant="outlined" />
                        </div>
                        <div className="row d-flex justify-content-around justify-content-lg-between gap-4 w-75">
                            <TextField className="col-11 col-lg-7" id="outlined-basic" name="email" label="Email" variant="outlined" />
                            <TextField className="col-11 col-lg-4" id="outlined-basic" name="phoneNumber" label="Phone" variant="outlined" />
                        </div>
                        <div className="row d-flex justify-content-around justify-content-lg-between gap-4 w-75">
                            <TextField className="col-5 col-lg-4" id="outlined-basic" name="country" label="Country" variant="outlined" />
                            <TextField className="col-5 col-lg-3" id="outlined-basic" name="city" label="City" variant="outlined" />
                            <TextField className="col-5 col-lg-4" id="outlined-basic" name="street" label="Street" variant="outlined" />
                        </div>
                        <div className="row d-flex justify-content-around justify-content-lg-between gap-4 w-75">
                            <TextField className="col-5 col-lg-4" id="outlined-basic" name="State" label="State" variant="outlined" />
                            <TextField className="col-5 col-lg-3" id="outlined-basic" type="number" name="zip" label="Zip" variant="outlined" />
                            <TextField
                                className="col-11 col-lg-4"
                                id="outlined-select-currency-native"
                                select
                                label="Gender"
                                name="gender"
                                defaultValue="Male"
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Please select your Gender"
                            >
                                {genders.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </div>
                        <div className="row d-flex justify-content-around justify-content-lg-between gap-4 w-75">
                            <LocalizationProvider name="dateOfBirth" dateAdapter={AdapterDayjs}>
                                <DatePicker onChange={(e)=> handleDateChange(e)} className="col-11 col-lg-5" />
                            </LocalizationProvider>
                            <TextField className="col-11 col-lg-5" id="outlined-basic" type="file" name="image" variant="outlined" />
                        </div>


                        <div className="row d-flex justify-content-between gap-4 w-75">
                            <Button type="submit" className="col-8 col-lg-4" variant="contained" color="primary">
                                Update
                            </Button>
                        </div>
                    </form>
                </div>

            </Dialog>
        </div>
    );
}

export default Edit;