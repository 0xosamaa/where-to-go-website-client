import { Typography } from "@mui/material"
import './SearchItem.css'
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon"
import StarIcon from '@mui/icons-material/Star';

const SearchItem = () => {
    return (
        <div className="d-flex">
            <img className="card-image" src="https://picsum.photos/600/300" alt="demo" />
            <div className="card-body">
                <div className="content d-flex flex-column justify-content-between">
                    <div className="card-details">
                        <Typography className="card-text" variant="body">Restaurant in Cairo, New Cairo</Typography>
                        <Typography variant="h4">The best restaurant ever</Typography>
                        <hr style={{ width: 56, color: '#9095A0', borderWidth: 2, margin: '10px 0' }}/>
                        <Typography className="card-text" variant="body">Amet enim fugiat la</Typography>
                        <br />
                        <Typography className="card-text" variant="body">Kitchen • Wifi • Air conditioning</Typography>
                    </div>
                    <div className="card-rating d-flex">
                        <StarIcon fontSize="small" color="primary" className="me-2" />
                        <Typography variant="body"><b>4.84</b> &nbsp;<span className="text-muted">(324 reviews)</span></Typography>
                    </div>
                </div>
                <div className="love-icon">
                    <FavouriteIcon />
                </div>
            </div>
        </div>
    )
}

export default SearchItem
