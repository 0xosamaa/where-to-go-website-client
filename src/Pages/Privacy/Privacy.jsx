import {Container, Typography} from "@mui/material";
import * as React from "react";
import privacyImg from "../../assets/privacy.jpg";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
    const navigate = useNavigate()
    return (
        <Container className="my-0 my-lg-5 justify-content-center align-items-center">
            <div className="mx-auto col-12 d-flex">
                <img className="w-100" src={privacyImg}/>
            </div>
            <div className="mx-auto col-12 col-lg-8">
                <Typography variant="h1" className="text-start mb-3">Privacy</Typography>
                <Typography className="my-5">
                    At WhereToGo, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide while using our website.
                </Typography>
                <Typography className="my-5">
                    <Typography variant="h3">Information We Collect</Typography>
                    When you use our website, we may collect the following types of information:
                    <ul>
                        <li>
                        <span className="fw-bold">Personal Information: </span>This may include your name, email address, location, and any other information you voluntarily provide to us through forms or account registration.
                        </li>
                        <li>
                        <span className="fw-bold">Usage Information: </span>We gather data on how you interact with our website, such as your IP address, browser type, device information, and usage patterns. This information helps us improve our services and provide a better user experience.
                        </li>
                    </ul>
                </Typography>
                <Typography className="my-5">
                    <Typography variant="h3">How We Use Your Information</Typography>
                    We use the information we collect for the following purposes:
                    <ul>
                        <li>
                        <span className="fw-bold">Personalization: </span>We utilize your information to personalize your experience and deliver tailored recommendations that match your preferences.
                        </li>
                        <li>
                        <span className="fw-bold">Improvement of Services: </span>Your feedback and usage information help us enhance our website, features, and overall user experience.
                        </li>
                        <li>
                        <span className="fw-bold">Communication: </span>We may use your email address to send you important updates, newsletters, or information about new features and promotions. You have the option to unsubscribe from these communications at any time.
                        </li>
                    </ul>
                </Typography>
                <Typography className="my-5">
                    <Typography variant="h3">Data Security</Typography>
                    We take the security of your personal information seriously and implement appropriate measures to protect it from unauthorized access, alteration, disclosure, or destruction. However, please be aware that no data transmission over the internet or electronic storage method is 100% secure, and we cannot guarantee absolute security.
                </Typography>
                <Typography className="my-5">
                    <Typography variant="h3">Cookies and Tracking Technologies</Typography>
                    We use cookies and similar tracking technologies to enhance your browsing experience and collect information about how you use our website. You can adjust your browser settings to refuse cookies, but please note that certain features of the website may not function properly without them.
                </Typography>
                <Typography className="my-5">
                    <Typography variant="h3">Your Rights</Typography>
                    You have the right to access, update, correct, or delete your personal information. If you would like to exercise any of these rights or have any questions or concerns regarding your privacy, please contact us using the information provided below.
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

export default Privacy