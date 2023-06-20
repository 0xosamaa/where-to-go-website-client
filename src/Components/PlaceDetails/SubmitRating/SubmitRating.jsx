import { Alert, Button, Rating, Snackbar, TextField, styled, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addReview, getReviews } from "../../../Redux/Slices/reviewSlice";
import { getPlace } from "../../../Redux/Slices/placeSlice";

const SubmitRating = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [alert, setAlert] = useState({
        visible: false,
        severity: '',
        message: '',
    });

    const error = useSelector((state) => state.review.error);

    const handleReviewSubmit = () => {
        if (rating < 1 || rating > 5) {
        setAlert({ visible: true, severity: 'error', message: 'Rating must be between 1 and 5 stars' });
        } else if (!content) {
            setAlert({ visible: true, severity: 'error', message: 'Review content is required' });
        } else {
            dispatch(addReview({ placeId: id, content, rating }))
            .then((data) => {
                if (data.payload.success) {
                    setAlert({ visible: true, severity: 'success', message: 'Review is submitted successfully' });
                    dispatch(getPlace(id));
                    dispatch(getReviews());
                }
                else {
                    setAlert({ visible: true, severity: 'error', message: data.payload.error });
                }
            })
            .catch((err) => {
                console.error(err)
            })
        }
    }

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: theme.palette.primary.main,
        },
        '& .MuiRating-iconHover': {
          color: theme.palette.primary.main,
        },
      });

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlert({ ...alert, visible: false });
    }

    return (
        <>
        <StyledRating
            value={rating}
            onChange={(e, newValue) => {
                setRating(newValue);
            }}
        />
        <TextField
          className="mt-2 mb-4"
          id="review-content"
          multiline
          rows={4}
          placeholder="Leave your feedback..."
          value={content}
          onChange={(e) => {
              setContent(e.target.value);
          }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          style={{ width: 120, margin: "auto" }}
          onClick={handleReviewSubmit}
        >
            Submit
        </Button>
        <Snackbar open={alert.visible} autoHideDuration={5000} onClose={handleAlertClose}>
            <Alert onClose={handleAlertClose} severity={alert.severity} sx={{ width: '100%' }}>
                {alert.message}
            </Alert>
        </Snackbar>
        </>
    )
}

export default SubmitRating