import { Typography } from "@mui/material";
import "../../../Components/SearchResults/SearchItem/SearchItem.css";
import StarIcon from "@mui/icons-material/Star";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder.js";
import Favorite from "@mui/icons-material/Favorite.js";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFavoriteVendor,
  getFavoriteVendors,
} from "../../../Redux/Slices/profileSlice.js";
import { useNavigate } from "react-router-dom";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Card = ({ place, page }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);
  const customer = useSelector((state) => state.profile.customer);

  const handleFavourite = () => {
    if (checked) {
      let data = {
        customerId: customer._id,
        vendorId: place._id,
      };
      dispatch(deleteFavoriteVendor(data)).then((res) => {
        console.log(res);
        dispatch(getFavoriteVendors(page));
      });
    }
  };

  return (
    <div className="d-flex flex-column flex-lg-row col-12">
      <img
        onClick={() => navigate(`/place/${place._id}`)}
        className="card-image flex-fill"
        src={
          place.thumbnail
            ? `http://localhost:8001/api/v1/images/vendors/${place.thumbnail}`
            : "https://picsum.photos/600/400"
        }
        alt="demo"
      />
      <div className="card-body d-flex flex-fill justify-content-between mt-3 mt-lg-0">
        <div
          onClick={() => navigate(`/place/${place._id}`)}
          className="content d-flex flex-column justify-content-between"
        >
          <div className="card-details">
            <Typography className="card-text" variant="body">{`${
              place.category[0]?.name
            } in ${place.address?.city || "NoWhere"} - ${
              place.address?.country || "NoWhere"
            }`}</Typography>
            <Typography variant="h4">{place.placeName}</Typography>
            <hr
              style={{
                width: 90,
                color: "#9095A0",
                borderWidth: 2,
                margin: "10px 0",
              }}
            />
            <Typography className="card-text description" variant="body">
              {place.description}
            </Typography>
            <hr
              style={{
                width: 70,
                color: "#9095A0",
                borderWidth: 2,
                margin: "10px 0",
              }}
            />
            <Typography className="card-text" variant="body">
              Owner : {`${place.firstName} ${place.lastName}`}
            </Typography>
          </div>
          <div className="card-rating d-flex">
            <StarIcon fontSize="small" color="primary" className="me-2" />
            <Typography variant="body">
              <b>{place.avgRate}</b> &nbsp;
              <span className="text-muted">
                ({place.numberOfReviews} reviews)
              </span>
            </Typography>
          </div>
        </div>
        <div className="love-icon">
          <div>
            <Checkbox
              {...label}
              checked={checked}
              onClick={handleFavourite}
              icon={<FavoriteBorder style={{ color: "#9095A0" }} />}
              checkedIcon={<Favorite />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
