import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { FormControlLabel, Radio, RadioGroup, Slider } from "@mui/material";
import CustomizedCheckbox from "../CustomizedCheckbox/CustomizedCheckbox";
import CustomizedRadio from "../CustomizedRadio/CustomizedRadio";
import { useDispatch } from "react-redux";
import { setFilters } from "../../../Redux/Slices/searchSlice";

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
  const [expanded, setExpanded] = React.useState("");
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleRatingChange = (event, value) => {
    dispatch(setFilters({ data: value, type: props.title }))
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
          {props.title === "Categories" ? (
            <RadioGroup
              name="categories-group"
            >
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
          ) :
          (
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
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

FilterMenu.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default FilterMenu;
