import {Alert, Container, Snackbar, TextField, Typography} from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import contactusImage from "../../assets/contactus.jpeg";
import {useState} from "react";
import axios from "axios";


const ContactUs = () => {
    const [open, setOpen] = useState(false);
    const [res, setRes] = useState({
        mssg: "",
        status: ""
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            message: e.target.message.value
        }
        axios.post("http://localhost:8001/api/v1/contact", data)
            .then((res) => {
                setRes({
                    mssg: "Your message has been sent successfully",
                    status: "success"
                })
                setOpen(true);
            })
            .catch((err) => {
                setRes({
                    mssg: "Something went wrong",
                    status: "error"
                })
                setOpen(true);
            })
    }

    return (
        <Container className="d-flex flex-column-reverse flex-lg-row justify-content-between align-items-start my-0 my-lg-5">
            <div className="form col-12 col-lg-5">
                <Typography variant="h1" className="text-start mb-3">Contact Us</Typography>
                <form onSubmit={(e)=> handleSubmit(e)} className="w-100 d-flex justify-content-center flex-column gap-4 align-items-center" action="">
                    <div className="row d-flex justify-content-around justify-content-lg-between gap-4 w-100">
                        <TextField className="col-12" id="outlined-basic" required name="name" label="Name" variant="outlined" />
                    </div>
                    <div className="row d-flex justify-content-around justify-content-lg-between gap-4 w-100">
                        <TextField className="col-12" id="outlined-basic" required name="email" label="Email" variant="outlined" />
                    </div>
                    <div className="row d-flex justify-content-around justify-content-lg-between gap-4 w-100">
                        <TextField className="col-12" id="outlined-basic" required multiline rows={3} name="message" label="Message" variant="outlined" />
                    </div>
                    <div className="row d-flex justify-content-between gap-4 w-100">
                        <Button type="submit" className="col-12" variant="contained" color="primary">
                            Send My Message
                        </Button>
                    </div>
                </form>
            </div>
            <div className="col-12 col-lg-5 d-flex justify-content-center align-items-center">
                <img className="w-100" src={contactusImage}/>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={res.status === 'success'? "success" : "error"} sx={{ width: '100%' }}>
                    {res.mssg}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default ContactUs