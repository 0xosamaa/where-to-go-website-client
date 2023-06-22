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
import { useEffect, useState } from "react";

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
  const placeName = useSelector((state) => state.search.searchParams.search)
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    dispatch(getVendorsNames())
  }, [])

  useEffect(() => {
    searchWithFilters();
  }, [placeName])

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
      dispatch(setPlaceName(event.target.value));
    }
  }

  return (
    <div className="search-bar-body my-4">
      <SearchIcon
        className="search-icon"
        onClick={searchWithFilters}
        style={{ backgroundColor: theme.palette.primary.main, zIndex: 1 }}
      />
        <CssAutocomplete
          style={{ 
            width: '100%',
          }}
          freeSolo
          disableClearable 
          options={filteredOptions}
          size="small"
          id="country-autocomplete"
          onKeyUp={handleKeyPress}
          onInputChange={(event, placeName) => {
            setFilteredOptions(placeName ? vendorsNames : []);
          }}
          onChange={(event, placeName) => {
            dispatch(setPlaceName(placeName));
          }}
          renderInput={(params) => <TextField {...params} label="Enter place name" />}
        />
    </div>
  );
};

export default SearchBar;
