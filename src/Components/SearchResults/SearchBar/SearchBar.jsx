import "./SearchBar.css";
import { Typography, useTheme } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from "react-redux";
import { setPagination, setQueryString, vendorSearch } from "../../../Redux/Slices/searchSlice";

const SearchBar = () => {
    const theme = useTheme();
    const searchParams = useSelector((state) => state.search.searchParams);
    const dispatch = useDispatch();
    const pagination = useSelector((state) => state.search.pagination);

    const searchWithFilters = async () => {
        let queryString = "";
        Object.entries(searchParams).forEach(([key, value]) => {
            if (value.length > 0) {
                if (key === 'category' || key === 'tags' || key === 'rating') {
                    queryString += `filters[${key}]=`
                    value.forEach((item, index) => {
                        if (index) {
                            queryString += `,${item}`;
                        } else {
                            queryString += item;
                        }
                    })
                    queryString += '&'
                } else if (key === 'location') {
                    Object.entries(value).forEach(([key, value]) => {
                        queryString += `${key}=${value}&`
                    })
                } else {
                    queryString += `${key}=${value}&`
                }
            }
        })
        await dispatch(setPagination({ ...pagination, currentPage: 1 }));
        await dispatch(setQueryString(queryString))
        dispatch(vendorSearch());
        console.log(queryString)
    }

    return (
        <div className="search-bar-body">
            <SearchIcon className="search-icon" onClick={searchWithFilters} style={{ backgroundColor: theme.palette.primary.main }} />
            
        </div>
    );
}

export default SearchBar;
