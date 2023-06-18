import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {Alert, Snackbar, TextField} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {useDispatch, useSelector} from "react-redux";
import {updateCustomer} from "../../../Redux/Slices/profileSlice.js";
import dayjs from "dayjs";
import {useState} from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const genders = [
    {
        value:"male",
        label:"Male"
    },
    {
        value:"female",
        label:"Female"
    }
]

const Edit = ({handleClickOpen, handleClose, open, handleOpens}) => {
    const dispatch = useDispatch();
    const customer = useSelector(state => state.profile.customer);
    const [dateOfBirth, setDateOfBirth] = React.useState(dayjs(customer.dateOfBirth));
    const error = useSelector(state => state.profile.error);


    const handleSubmit = (e) => {
        e.preventDefault();
        let date = new Date(dateOfBirth)
        let data = new FormData(e.target);
        data.set('dateOfBirth', date);

        dispatch(updateCustomer(data)).then((res) => {
            if (res.payload._id !== undefined) {
                handleClose();
            }
            handleOpens();
            console.log(res);
        });
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
                        <div className="row d-flex justify-content-around gap-3 gap-lg-0 justify-content-lg-around w-75">
                            <TextField className="col-12 col-lg-5" id="outlined-basic" defaultValue={customer.firstName} name="firstName" label="First Name" variant="outlined" />
                            <TextField className="col-12 col-lg-5" id="outlined-basic" defaultValue={customer.lastName} name="lastName" label="Last Name" variant="outlined" />
                        </div>
                        <div className="row d-flex justify-content-around justify-content-lg-around gap-3 w-75">
                            <TextField className="col-12 col-lg-11" id="outlined-basic" defaultValue={customer.email} name="email" label="Email" variant="outlined" />
                        </div>
                        <div className="row d-flex justify-content-around gap-3 gap-lg-0 justify-content-lg-around w-75">
                            <TextField className="col-12 col-lg-5" id="outlined-basic" defaultValue={customer.address?.country} name="country" label="Country" variant="outlined" />
                            <TextField className="col-12 col-lg-5" id="outlined-basic" defaultValue={customer.address?.city} name="city" label="City" variant="outlined" />
                        </div>
                        <div className="row d-flex justify-content-around gap-3 gap-lg-0 justify-content-lg-around w-75">
                            <TextField className="col-12 col-lg-5" id="outlined-basic" defaultValue={customer.phoneNumber} name="phoneNumber" label="Phone" variant="outlined" />
                            <TextField
                                className="col-12 col-lg-5"
                                id="outlined-select-currency-native"
                                select
                                label="Gender"
                                name="gender"
                                defaultValue={customer.gender || 'male'}
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
                        <div className="row d-flex justify-content-around gap-3 gap-lg-0 justify-content-lg-around w-75">
                            <TextField className="col-12 col-lg-3" id="outlined-basic" defaultValue={customer.address?.street} name="street" label="Street" variant="outlined" />
                            <TextField className="col-12 col-lg-3" id="outlined-basic" defaultValue={customer.address?.state} name="state" label="State" variant="outlined" />
                            <TextField className="col-12 col-lg-3" id="outlined-basic" defaultValue={customer.address?.zip} name="zip" label="Zip" variant="outlined" />
                        </div>
                        <div className="row d-flex justify-content-around gap-3 gap-lg-0 justify-content-lg-around w-75">
                            <LocalizationProvider name="dateOfBirth" dateAdapter={AdapterDayjs}>
                                <DatePicker defaultValue={dayjs(customer.dateOfBirth)} onChange={(e)=> handleDateChange(e)} className="col-12 col-lg-5" />
                            </LocalizationProvider>
                            <TextField className="col-12 col-lg-5" id="outlined-basic" type="file" name="image" variant="outlined" />
                        </div>


                        <div className="row d-flex justify-content-around gap-4 w-75">
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