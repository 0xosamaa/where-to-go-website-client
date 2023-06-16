import "./SearchBar.css";
import { Typography, useTheme } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    const theme = useTheme();

    return (
        <div className="search-bar-body">
            <SearchIcon className="search-icon" style={{ backgroundColor: theme.palette.primary.main }} />
            
        </div>
    );
}

export default SearchBar;
