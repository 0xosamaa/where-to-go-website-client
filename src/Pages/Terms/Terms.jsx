import {Container, Typography} from "@mui/material";
import * as React from "react";
import termsImg from "../../assets/terms.jpg";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Terms = () => {
    const navigate = useNavigate()
    return (
        <Container className="my-0 my-lg-5 justify-content-center align-items-center">
            <div className="mx-auto col-12 d-flex">
                <img className="w-100" src={termsImg}/>
            </div>
            <div className="mx-auto col-12 col-lg-8">
                <Typography variant="h1" className="text-start mb-3">Terms and Conditions</Typography>
                <Typography className="my-5">
                    These terms and conditions ("Terms") govern your use of the WhereToGo website and services. By accessing or using our website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please refrain from using our services.
                </Typography>
                <Typography className="my-5">
                    <Typography variant="h3">Use of the Website</Typography>
                    <ul>
                        <li>
                        You must be at least 18 years old to use our website or have the legal consent of a parent or guardian.
                        </li>
                        <li>
                            You are responsible for maintaining the confidentiality of any account credentials and agree to notify us immediately of any unauthorized access or use of your account.
                        </li>
                        <li>
                            You agree not to engage in any activity that may disrupt or interfere with the functioning of our website or compromise its security.
                        </li>
                    </ul>
                </Typography>
                <Typography className="my-5">
                    <Typography variant="h3">User-Generated Content</Typography>
                    <ul>
                        <li>
                            By submitting any content to our website, including reviews, comments, or other contributions, you grant us a non-exclusive, worldwide, royalty-free, perpetual, and transferable right to use, reproduce, modify, distribute, and display that content.
                        </li>
                        <li>
                            You represent and warrant that you have the necessary rights to grant us the above license and that your content does not infringe upon the rights of any third party.
                        </li>
                    </ul>
                </Typography>
                <Typography className="my-5">
                    <Typography variant="h3">Intellectual Property Rights</Typography>
                    <ul>
                        <li>
                            All content on the WhereToGo website, including text, graphics, logos, and images, is the property of WhereToGo or its licensors and is protected by copyright, trademark, and other intellectual property laws.
                        </li>
                        <li>
                            You may not use, reproduce, distribute, modify, or create derivative works of any content on our website without our prior written consent.
                        </li>
                    </ul>
                </Typography>
                <Typography className="my-5">
                    <Typography variant="h3">Links to Third-Party Websites</Typography>
                    <ul>
                        <li>
                            Our website may contain links to third-party websites that are not owned or controlled by WhereToGo. We are not responsible for the content, privacy practices, or terms and conditions of these websites.
                        </li>
                        <li>
                            We encourage you to review the terms and privacy policies of any third-party websites you visit.
                        </li>
                    </ul>
                </Typography>
                <Typography className="my-5">
                    <Typography variant="h3">Modification of Terms</Typography>
                    <ul>
                        <li>
                            We reserve the right to modify or update these Terms at any time without prior notice. It is your responsibility to review these Terms periodically for any changes.
                        </li>
                        <li>
                            By continuing to use our website after any modifications, you agree to be bound by the revised Terms.
                        </li>
                    </ul>
                </Typography>
                <Typography className="my-5">
                    <Typography variant="h3">Governing Law and Jurisdiction</Typography>
                    <ul>
                        <li>
                            These Terms shall be governed by and construed in accordance with the laws of Egypt, without regard to its conflict of laws provisions. Any dispute arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the courts in Egypt.
                        </li>
                        <li>
                            Any dispute arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the courts in Egypt.
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

export default Terms