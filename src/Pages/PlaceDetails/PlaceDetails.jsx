import {
    Button,
    Pagination,
    Typography,
    useTheme,
    Container,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import SearchItem from '../../Components/SearchItem/SearchItem';
import FilterMenu from '../../Components/FilterMenu/FilterMenu';
import {
    getCategories,
    getTags,
    vendorSearch,
} from '../../Redux/Slices/searchSlice';
import { getPlace } from '../../Redux/Slices/placeSlice';
import './PlaceDetails.css';
import RiseLoader from 'react-spinners/RiseLoader';
import { useNavigate, useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import FavouriteIcon from '../../Components/FavouriteIcon/FavouriteIcon';
import ShareIcon from '@mui/icons-material/Share';
import Carousel from 'react-material-ui-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    const [images, setImages] = useState([]);
    const [galleryVisible, setGalleryVisible] = useState(false);

    const override = {
        display: 'block',
        margin: '30vh auto',
    };

    useEffect(() => {
        dispatch(getPlace(id)).then((data) => {
            console.log(data);
            const _gallery = [];
            _gallery.push(data.payload.thumbnail);
            _gallery.push(...data.payload.gallery);
            setImages(_gallery);
            setLoading(false);
        });
    }, []);

    const rating = [
        { id: 1, name: 'Below 3' },
        { id: 2, name: 'From 3 to 4' },
        { id: 3, name: 'Above 4' },
    ];

    const handlePageChange = (event, page) => {
        setLoading(true);
        dispatch(vendorSearch(`page=${page}`)).then((data) => {
            const { currentPage, totalPages } = data.payload.pagination;
            setPagination({ currentPage, totalPages });
            setLoading(false);
        });

        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'auto',
            });
        }, 0);
    };

    const handleSearchItemClick = (evnet, placeId) => {
        console.log(placeId);
        navigate('/place');
    };

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
                            <StarIcon
                                fontSize="small"
                                color="primary"
                                className="me-2"
                            />
                            <Typography variant="body">
                                <b>4.84</b> &nbsp;
                                <span className="text-muted">
                                    (324 reviews)
                                </span>
                            </Typography>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center me-4">
                                <ShareIcon className="me-2" />
                                <Typography
                                    variant="body"
                                    style={{ fontSize: 20 }}
                                >
                                    Share
                                </Typography>
                            </div>
                            <div className="d-flex align-items-center">
                                <FavouriteIcon />
                                <Typography
                                    variant="body"
                                    style={{ fontSize: 20 }}
                                >
                                    Save
                                </Typography>
                            </div>
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
                                place.gallery ? place.gallery[0] : ''
                            }`}
                            alt="gallery-1"
                        />
                        <img
                            className="gallery-2"
                            src={`http://localhost:8001/api/v1/images/vendors/${
                                place.gallery ? place.gallery[1] : ''
                            }`}
                            alt="gallery-2"
                        />
                        <img
                            className="gallery-3"
                            src={`http://localhost:8001/api/v1/images/vendors/${
                                place.gallery ? place.gallery[2] : ''
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
                                    animation="slide"
                                    duration={500}
                                    swipe={true}
                                    indicators={false}
                                    navButtonsAlwaysVisible={true}
                                    cycleNavigation={false}
                                >
                                    {images.map((img, index) => (
                                        <img
                                            key={index}
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
                </>
            )}
        </Container>
    );
};

export default SearchResults;
