import './SearchResults.css'
import FilterMenu from "../../Components/FilterMenu/FilterMenu";
import { Typography } from '@mui/material';
import SearchItem from '../../Components/SearchItem/SearchItem';

const SearchResults = () => {
    const Rating = ['Below 3', 'From 3 to 4', 'Above 4'];
    const Categories = ['Restaurants', 'Parks', 'Hotels', 'Open Places'];
    const Tags = ['Air Conditioner', 'Wifi', 'Kitchen'];

    return (
        <div className="container d-flex column">
            <div className="filter-menu d-none d-lg-block">
                <FilterMenu title="Rating" options={Rating} />
                <FilterMenu title="Categories" options={Categories} />
                <FilterMenu title="Tags" options={Tags} />
            </div>
            <div className="search-results">
                <Typography variant="body" className='mb-3'>150+ Places in Egypt</Typography>
                <SearchItem />
                <hr style={{ width: '100%', color: '#9095A0', borderWidth: 2, margin: '24px 0' }}/>
                <SearchItem />
                <hr style={{ width: '100%', color: '#9095A0', borderWidth: 2, margin: '24px 0' }}/>
                <SearchItem />
                <hr style={{ width: '100%', color: '#9095A0', borderWidth: 2, margin: '24px 0' }}/>
                <SearchItem />
            </div>
        </div>
    )
};

export default SearchResults;
