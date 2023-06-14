import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function FavouriteIcon() {
  return (
    <div>
      <Checkbox {...label} icon={<FavoriteBorder style={{ color: '#9095A0' }} />} checkedIcon={<Favorite />} />
    </div>
  );
}