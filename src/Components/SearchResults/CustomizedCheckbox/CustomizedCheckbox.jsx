import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from "prop-types";
import { setFilters } from "../../../Redux/Slices/searchSlice.js"
import { useDispatch, useSelector } from "react-redux";

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1.5px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  '.Mui-focusVisible &': {
    outline: `2px auto ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#f8f9fa',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `linear-gradient(180deg, ${theme.palette.common.white} 10%, ${theme.palette.common.transparent} 90%)`,
    boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}, inset 0 -1px 0 ${theme.palette.primary.main}`,
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E")`,
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.primary.main,
    },
  }));

// Inspired by blueprintjs
function BpCheckbox(props) {
  return (
    <Checkbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

const CustomizedCheckbox = ({ data, type }) => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.search.searchParams.tags);

  return (
    <BpCheckbox checked={tags.includes(data.id)} onChange={
      () => dispatch(setFilters({ data, type }))
    } />
  );
}

CustomizedCheckbox.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default CustomizedCheckbox
