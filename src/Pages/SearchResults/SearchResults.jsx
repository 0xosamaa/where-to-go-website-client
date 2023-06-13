import './SearchResults.css'
import FilterMenu from "../../Components/FilterMenu/FilterMenu";

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
            <div style={{width: '100%', height: '100px', backgroundColor: '#00BBAA' }}></div>
        </div>
    )
};

export default SearchResults;
