import { Button, Pagination, Typography, useTheme, Container, Rating, styled, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import TagIcon from '@mui/icons-material/Tag';
import { formatDistanceToNow } from "date-fns";

import {
    getCategories,
    getTags,
    vendorSearch,
} from '../../Redux/Slices/searchSlice';
import SubmitRating from '../../Components/PlaceDetails/SubmitRating/SubmitRating';
import { getPlace } from '../../Redux/Slices/placeSlice';
import './PlaceDetails.css';
import RiseLoader from 'react-spinners/RiseLoader';
import { useNavigate, useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import FavouriteIcon from '../../Components/FavouriteIcon/FavouriteIcon';
import ShareIcon from '@mui/icons-material/Share';
import Carousel from 'react-material-ui-carousel';
import { getReviews, setReviewsVisible } from "../../Redux/Slices/reviewSlice";
import { getAllFavoriteVendors } from "../../Redux/Slices/profileSlice";
import AllReviews from "../../Components/PlaceDetails/AllReviews/AllReviews";

const SearchResults = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const _categories = useSelector((state) => state.search.categories);
  const _tags = useSelector((state) => state.search.tags);
  const result = useSelector((state) => state.search.result);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 5,
  });
  const place = useSelector((state) => state.place.place);
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const reviews = useSelector((state) => state.review.reviews)
  const favoriteVendors = useSelector((state) => state.profile.favoriteVendors);
  
  const override = {
      display: 'block',
      margin: '30vh auto',
  };

  useEffect(() => {
    dispatch(getAllFavoriteVendors());
    dispatch(getPlace(id)).then((data) => {
      setTags(data.payload.tags);
      dispatch(getReviews(id))
      const _gallery = [];
      _gallery.push(data.payload.data.thumbnail);
      _gallery.push(...data.payload.data.gallery);
      setImages(_gallery);
      setLoading(false);
    });
  }, []);

    const handleSearchItemClick = (evnet, placeId) => {
        console.log(placeId);
        navigate('/place');
    };

    const StyledRating = styled(Rating)({
      '& .MuiRating-iconFilled': {
        color: theme.palette.primary.main,
      },
      '& .MuiRating-iconHover': {
        color: theme.palette.primary.main,
      },
    });

  return (
    <Container className="d-flex flex-column mt-4 mb-5">
      {loading ? (
        <RiseLoader
          color={theme.palette.primary.main}
          loading={loading}
          cssOverride={override}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <Typography variant="h1" className="pb-0">
            {place.placeName}
          </Typography>
          <div className="d-flex justify-content-between align-items-center">
            <div className="card-rating d-flex">
              <StarIcon fontSize="small" color="primary" className="me-2" />
              <Typography variant="body">
                <b>{place.avgRate.toFixed(1) || (0).toFixed(1)}</b> &nbsp;
                <span className="text-muted">({place.numberOfReviews || 0} reviews)</span>
              </Typography>
            </div>
            <div className="d-flex align-items-center">

              {/* <div className="d-flex align-items-center me-4">
                <ShareIcon className="me-2" />
                <Typography variant="body" style={{ fontSize: 20 }}>
                  Share
                </Typography>
              </div> */}
              {isLoggedIn ? (
                <div className="d-flex align-items-center">
                  <FavouriteIcon vendorId={id} checked={favoriteVendors.filter((vendor) => vendor._id === id).length > 0} />
                  <Typography variant="body" style={{ fontSize: 20 }}>
                    Save
                  </Typography>
                </div>
                ) : ('')
              }
            </div>
          </div>
          <div className="gallery mt-3">
            <img
              className="thumbnail"
              src={`http://localhost:8001/api/v1/images/vendors/${place?.thumbnail}`}
              alt="thumbnail"
            />
            <img
              className="gallery-1"
              src={`http://localhost:8001/api/v1/images/vendors/${
                place.gallery ? place.gallery[0] : ""
              }`}
              alt="gallery-1"
            />
            <img
              className="gallery-2"
              src={`http://localhost:8001/api/v1/images/vendors/${
                place.gallery ? place.gallery[1] : ""
              }`}
              alt="gallery-2"
            />
            <img
              className="gallery-3"
              src={`http://localhost:8001/api/v1/images/vendors/${
                place.gallery ? place.gallery[2] : ""
              }`}
              alt="gallery-3"
            />
            <Button
              variant="contained"
              color="info"
              className="gallery-btn"
              onClick={() => setGalleryVisible(true)}
            >
              Gallery
            </Button>
          </div>
          {galleryVisible && (
            <>
              <CloseIcon
                size="large"
                onClick={() => setGalleryVisible(false)}
                className="close-gallery"
              />
              <div className="gallery-container">
                <Carousel
                  className="gallery-slider"
                  autoPlay={false}
                  animation="fade"
                  duration={250}
                  swipe={false}
                  indicators={false}
                  navButtonsAlwaysVisible={true}
                  cycleNavigation={false}
                >
                  {images.map((img, index) => (
                    <img
                      key={`img_${index}`}
                      className=""
                      src={`http://localhost:8001/api/v1/images/vendors/${img}`}
                      alt=""
                      draggable={false}
                    />
                  ))}
                </Carousel>
              </div>
            </>
          )}
          <div className="d-flex flex-column flex-md-row">
            <div className="overview flex-grow-1">
              <Typography variant="h2" className="mt-4 mb-0">
                Overview
              </Typography>
              <div className="d-flex mb-2">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-2">
                    <LocationOnIcon color="primary" className="me-1" />
                    <Typography variant="h6">
                      {place.address?.street}
                    </Typography>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <LocalOfferIcon
                      fontSize="small"
                      color="primary"
                      className="mx-1"
                    />
                    <Typography variant="h6">
                      {place.category[0].name}
                    </Typography>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-2">
                    <PersonIcon color="primary" className="me-2" />
                    <Typography variant="h6">{`${place.firstName} ${place.lastName}`}</Typography>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <LocalPhoneIcon color="primary" className="me-2" />
                    <Typography variant="h6">{place.phoneNumber}</Typography>
                  </div>
                </div>
              </div>
              <Typography variant="body">{place.description}</Typography>
            </div>
            <div className="tags flex-grow-1">
              <Typography variant="h2" className="mt-4 mb-0">
                Tags
              </Typography>
              {tags.map((tag, index) => {
                return (
                  <div key={`tag_${index}`} className="d-flex align-items-center mb-2">
                    <TagIcon color="primary" className="me-1" />
                    <Typography variant="h6">{tag}</Typography>
                  </div>
                )
              })}
            </div>
          </div>
          {place.numberOfReviews > 0 ? (
            <>
            <hr
              style={{
                width: "100%",
                color: "#9095A0",
                borderWidth: 2,
                margin: "32px 0",
              }}
            />
            <div className="card-rating d-flex">
              <StarIcon fontSize="small" color="primary" className="me-2 mb-3" />
              <Typography variant="body">
                <b>{place.avgRate.toFixed(1) || (0).toFixed(1)}</b> &nbsp;
                <span className="text-muted">({place.numberOfReviews || 0} reviews)</span>
              </Typography>
            </div>
            <div className="reviews-container">
              {reviews.map((review, index) => (
                index < 4 ? (
                  <div key={`review_${index}`} className="review-card">
                    <div className="review-user d-flex align-items-center mb-3">
                      <img
                          style={{ width: 48, borderRadius: '50%' }}
                          alt="Profile Image"
                          src={`http://localhost:8001/api/v1/images/customers/${review.userId.image}`}
                      />
                      <div className="ms-2">
                        <Typography variant="h6" >{review.userId.firstName + ' ' + review.userId.lastName}</Typography>
                        <Typography variant="body" color={"#9095A0"}>{formatDistanceToNow(new Date(review.timestamp), { addSuffix: true, includeSeconds: false })}</Typography>
                      </div>
                    </div>
                    <Typography variant="body" className="description">{review.content}</Typography>
                    <StyledRating size="small" defaultValue={review.rating} readOnly style={{ float: 'right'}} />
                  </div>
                ) : ('')
              ))}
              { place.numberOfReviews > 4 ? (
              <>
              <Button
                variant="contained"
                color="info"
                onClick={() => dispatch(setReviewsVisible(true))}
              >
                Show all reviews
              </Button>
              <AllReviews />
              </>
              ) : ('')}
            </div>
            </>
          ) : (
            ''
          )
          }
          {isLoggedIn ? (
            <>
            <hr
              style={{
                width: "100%",
                color: "#9095A0",
                borderWidth: 2,
                margin: "32px 0",
              }}
            />
            <Typography variant="h2" className="pt-0">
              Rate this place
            </Typography>
            <SubmitRating />
            </>
          ) : ('')
        }
        </>
      )}
    </Container>
  );
};

export default SearchResults;
