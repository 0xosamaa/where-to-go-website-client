import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { FormControlLabel } from "@mui/material";
import CustomizedCheckbox from "../CustomizedCheckbox/CustomizedCheckbox";

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
  const [expanded, setExpanded] = React.useState("panel");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
          <Typography>
            {props.options.map((option) => (
                <div className="d-block" key={option.id}>
                    <FormControlLabel control={<CustomizedCheckbox />} label={<Typography variant="body">{option.name}</Typography>} />
                </div>
            ))}
          </Typography>
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
