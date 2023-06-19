import { Typography } from "@mui/material"
import PropTypes from "prop-types";
import StarIcon from '@mui/icons-material/Star';

import FavouriteIcon from "../../FavouriteIcon/FavouriteIcon"
import './SearchItem.css'
import { useSelector } from "react-redux";

const SearchItem = ({ place, onClick }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    return (
        <div className="d-flex flex-column flex-lg-row">
            <img onClick={onClick} className="card-image clickable" src={`http://localhost:8001/api/v1/images/vendors/${place.thumbnail}`} alt="demo" />
            <div className="card-body d-flex flex-fill justify-content-between mt-3 mt-lg-0">
                <div onClick={onClick} className="content clickable d-flex flex-column justify-content-between">
                    <div className="card-details">
                        <Typography className="card-text" variant="body">{place.category ? place.category.name : 'Place'} 
                            {place.address?.country ? ` in ${place.address?.country}` : ''}
                            {place.address?.city ? `, ${place.address?.city}` : ''} 
                            {console.log(place)}   
                        </Typography>
                        <Typography variant="h4">{place.placeName}</Typography>
                        <hr style={{ width: 56, color: '#9095A0', borderWidth: 2, margin: '10px 0' }}/>
                        <Typography className="card-text description" variant="body">{place.description}</Typography>
                        <br />
                        <Typography className="card-text" variant="body">
                            {place.tagNames.map((tag, index) => {
                                if (index > 2) {
                                    return
                                }
                                if (index) {
                                    return ` • ${tag}`;
                                }
                                return tag;
                            })}
                        </Typography>
                    </div>
                    <div className="card-rating d-flex">
                        <StarIcon fontSize="small" color="primary" className="me-2" />
                        <Typography variant="body">
                            <b>{place.avgRate.toFixed(1) || (0).toFixed(1)}</b> &nbsp;
                            <span className="text-muted">({place.numberOfReviews || 0} reviews)</span>
                        </Typography>
                    </div>
                </div>
                {isLoggedIn ? (
                    <div className="love-icon">
                        <FavouriteIcon />
                    </div>
                ): ('')}
            </div>
        </div>
    )
}

SearchItem.propTypes = {
    place: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default SearchItem
