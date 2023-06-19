import { styled, useTheme } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider } from "@mui/material";
import CustomizedCheckbox from "../CustomizedCheckbox/CustomizedCheckbox";
import CustomizedRadio from "../CustomizedRadio/CustomizedRadio";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../../Redux/Slices/searchSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `0px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "#f8f9fa",
  flexDirection: "row",
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  height: 36,
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 6,
  paddingBottom: 6,
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: 0,
}));

const FilterMenu = (props) => {
  const [expanded, setExpanded] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleRatingChange = (event, value) => {
    dispatch(setFilters({ data: value, type: props.title }))
  }

  const handleSortFieldChange = (event) => {
    setSortField(event.target.value)
    dispatch(setFilters({ data: { sortField: event.target.value, sortOrder }, type: props.title }))
  }

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value)
    dispatch(setFilters({ data: { sortField, sortOrder: event.target.value }, type: props.title }))
  }

  return (
    <div>
      <Accordion
        expanded={expanded === "panel"}
        onChange={handleChange("panel")}
      >
        <AccordionSummary aria-controls="paneld-content" id="paneld-header">
          <Typography variant="h6">{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.title === "Categories" && isLoggedIn ? (
            <RadioGroup
              name="categories-group"
            >
              <CustomizedRadio data={{ id: "", name: "All"}} type={props.title} />
              {props.options.map((option) => (
                <CustomizedRadio data={option} type={props.title} key={option.id} />
              ))}
            </RadioGroup>
          ) : props.title === "Rating" ? (
            <Slider
              getAriaLabel={() => 'Rating range'}
              defaultValue={[0, 5]}
              min={0}
              max={5}
              step={1}
              onChange={handleRatingChange}
              valueLabelDisplay="auto"
            />
          ) : props.title === "Sort" ? (
            <>
            <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth size="small">
              <InputLabel id="sort-field-label">Field</InputLabel>
              <Select
                labelId="sort-field-label"
                id="sort-field"
                value={sortField}
                label="Field"
                onChange={handleSortFieldChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"placeName"}>Place Name</MenuItem>
                <MenuItem value={"category"}>Category</MenuItem>
                <MenuItem value={"avgRate"}>Rating</MenuItem>
                <MenuItem value={"numberOfReviews"}>Reviews Number</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth size="small">
              <InputLabel id="sort-order-label">Order</InputLabel>
              <Select
                labelId="sort-order-label"
                id="sort-order"
                value={sortOrder}
                label="Order"
                onChange={handleSortOrderChange}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
            </>
          ) :
          props.title === "Tags" && isLoggedIn ? (
            props.options.map((option) => (
              <div className="d-block" key={option.id}>
                <FormControlLabel
                  control={
                    <CustomizedCheckbox data={option} type={props.title} />
                  }
                  label={<Typography variant="body">{option.name}</Typography>}
                />
              </div>
            ))
          ) : (
            <Link to="/login">
              <Button 
                variant="contained" 
                size="small"
              >
                Login to unlock
              </Button>
            </Link>
          )
        }
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

FilterMenu.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array,
};

export default FilterMenu;
