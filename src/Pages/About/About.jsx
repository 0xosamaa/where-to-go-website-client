import {Container, Typography} from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import aboutusImg from "../../assets/aboutus.jpg";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
    const navigate = useNavigate()
    return (
        <Container className="my-0 my-lg-5 justify-content-center align-items-center">
            <div className="mx-auto col-12 d-flex">
                <img className="w-100" src={aboutusImg}/>
            </div>
            <div className="mx-auto col-12 col-lg-8">
                <Typography variant="h1" className="text-start mb-3">About Us</Typography>
                <Typography className="my-5">
                    Welcome to WhereToGo, your ultimate guide to finding the perfect places to go. Our team is dedicated to helping you make informed decisions and discover exceptional destinations, whether you're seeking a delightful restaurant, a cozy hotel, an engaging kids area, or any other experience.
                </Typography>
                <Typography className="my-5">
                    <Typography variant="h3">Our Story</Typography>
                    WhereToGo was founded with a vision to revolutionize the way people explore and choose their destinations. Frustrated by the lack of reliable and personalized recommendations available, our passionate team set out to create a platform that simplifies the process. Through extensive research, collaboration with local experts, and advanced technology, we've built a comprehensive database of top-notch establishments to ensure memorable experiences for every user.
                </Typography>
                <Typography className="my-5">
                    <Typography variant="h3">How We Help</Typography>
                    At WhereToGo, we understand that finding the right place to go can be overwhelming. That's why we've developed a user-friendly platform that streamlines the decision-making process. By considering your preferences, location, and real user reviews, our intelligent algorithms generate tailored recommendations that match your unique tastes and requirements. Our goal is to save you time and ensure you have unforgettable experiences every time you go out.
                </Typography>
                <Typography className="my-5">
                    <Typography variant="h3">Our Values</Typography>
                    <ul>
                        <li>
                        <span className="fw-bold">Quality: </span>We prioritize quality over quantity, handpicking establishments that meet the highest standards to ensure your satisfaction.
                        </li>
                        <li>
                        <span className="fw-bold">Reliability: </span>Our recommendations are based on real user reviews, ensuring that you can trust the authenticity and accuracy of the information.
                        </li>
                        <li>
                        <span className="fw-bold">Personalization: </span>We believe in the power of personalization. Our platform takes into account your preferences to deliver customized suggestions that resonate with you.
                        </li>
                        <li>
                        <span className="fw-bold">Community: </span>We strive to build a vibrant community of explorers, where users can share their experiences, provide valuable feedback, and inspire one another.
                        </li>
                    </ul>
                </Typography>
                <hr className="my-3 mx-auto"/>
                <div className="row d-flex justify-content-between gap-4 w-30">
                    <Button type="submit" variant="contained" color="primary" onClick={()=>navigate('/contactus')}>
                        Keep in touch with us
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default AboutUs