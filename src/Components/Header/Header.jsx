import "./Header.css";
import header1 from "../../assets/images/places/header/header-1.jpeg";
import header2 from "../../assets/images/places/header/header-2.jpg";
import header3 from "../../assets/images/places/header/header-3.jpg";
import { Typography, Container } from "@mui/material";
import { Carousel } from "react-bootstrap";
import HomeSearchBar from "../HomeSearchBar/HomeSearchBar";

const Header = () => {
  return (
    <header className="my-5" style={{ position: "relative" }}>
      <Container maxWidth="lg">
        {/* <HomeSearchBar /> */}
        <Carousel pause={false} controls={false}>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100 hero-img"
              src={header1}
              alt="First slide"
            />
            <Carousel.Caption>
              <Typography variant="h2" fontWeight={"bold"}>
                Awaken to a different world
              </Typography>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100 hero-img"
              src={header2}
              alt="Second slide"
            />
            <Carousel.Caption>
              <Typography variant="h2" fontWeight={"bold"}>
                Where the magic happens
              </Typography>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100 hero-img"
              src={header3}
              alt="Third slide"
            />
            <Carousel.Caption>
              <Typography variant="h2" fontWeight={"bold"}>
                Experience life
              </Typography>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </header>
  );
};

export default Header;
