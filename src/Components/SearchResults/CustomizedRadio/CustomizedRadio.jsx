import { FormControlLabel, Radio, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setFilters } from "../../../Redux/Slices/searchSlice";

const CustomizedRadio = ({ data, type }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <FormControlLabel
      key={data.id}
      value={data.id}
      control={
        <Radio
          onChange={(event) => {
            dispatch(setFilters({ data: { id: event.target.value }, type}))
          }}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 20,
              color: "rgba(16,22,26,.2)",
            },
            "&.Mui-checked .MuiSvgIcon-root": {
              color: theme.palette.primary.main,
            },
          }}
        />
      }
      label={<Typography variant="body">{data.name}</Typography>}
    />
  );
};

CustomizedRadio.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default CustomizedRadio;
