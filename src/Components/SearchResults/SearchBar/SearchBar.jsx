import "./SearchBar.css";
import { Typography, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {
  setKeyword,
  setPagination,
  setQueryString,
  vendorSearch,
} from "../../../Redux/Slices/searchSlice";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "rgba(0, 0, 0, 0)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgba(0, 0, 0, 0)",
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
        } else if (key === "location") {
          Object.entries(value).forEach(([key, value]) => {
            queryString += `${key}=${value}&`;
          });
        } else {
          queryString += `${key}=${value}&`;
        }
      }
    });
    await dispatch(setPagination({ ...pagination, currentPage: 1 }));
    await dispatch(setQueryString(queryString));
    dispatch(vendorSearch());
    console.log(queryString);
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
        style={{ backgroundColor: theme.palette.primary.main }}
      />
        <CssTextField 
          placeholder="Enter place name or owner" 
          style={{ width: 350 }} 
          id="custom-css-outlined-input" 
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
    </div>
  );
};

export default SearchBar;
