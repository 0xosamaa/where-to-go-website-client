import "./SearchBar.css";
import { Autocomplete, Typography, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {
  getVendorsNames,
  setKeyword,
  setPagination,
  setPlaceName,
  setQueryString,
  vendorSearch,
} from "../../../Redux/Slices/searchSlice";
import { useEffect } from "react";

const CssAutocomplete = styled(Autocomplete)({
  "& label.Mui-focused": {
    color: "rgba(0, 0, 0, 0)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgba(0, 0, 0, 0)",
  },
  "& .MuiInputLabel-shrink": {
    color: "rgba(0, 0, 0, 0)",
  },
  "& .MuiSvgIcon-root, .MuiAutocomplete-endAdornment": {
    display: "none",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(0, 0, 0, 0)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(0, 0, 0, 0)",
    },
  },
});

const SearchBar = () => {
  const theme = useTheme();
  const searchParams = useSelector((state) => state.search.searchParams);
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.search.pagination);
  const vendorsNames = useSelector((state) => state.search.vendorsNames);

  useEffect(() => {
    dispatch(getVendorsNames())
  }, [])

  const searchWithFilters = async () => {
    let queryString = "";
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value.length > 0) {
        if (key === "category" || key === "tags" || key === "rating") {
          queryString += `filters[${key}]=`;
          value.forEach((item, index) => {
            if (index) {
              queryString += `,${item}`;
            } else {
              queryString += item;
            }
          });
          queryString += "&";
        } else {
          queryString += `${key}=${value}&`;
        }
      }
    });
    await dispatch(setPagination({ ...pagination, currentPage: 1 }));
    await dispatch(setQueryString(queryString));
    dispatch(vendorSearch());
    // console.log(queryString);
  };

  const handleChange = (event) => {
    dispatch(setKeyword(event.target.value));
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchWithFilters();
    }
  }

  return (
    <div className="search-bar-body">
      <SearchIcon
        className="search-icon"
        onClick={searchWithFilters}
        style={{ backgroundColor: theme.palette.primary.main, zIndex: 1 }}
      />
        <CssAutocomplete
          style={{ 
            width: '100%',
            transform: 'translateY(3px)'
          }}
          className="mb-2"
          options={vendorsNames}
          size="small"
          id="country-autocomplete"
          onChange={(event, placeName) => {
            dispatch(setPlaceName(placeName));
          }}
          renderInput={(params) => <TextField {...params} label="Enter place name" />}
        />
    </div>
  );
};

export default SearchBar;
