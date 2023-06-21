import { Pagination, Typography, useTheme, Container, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import SearchItem from "../../Components/SearchResults/SearchItem/SearchItem";
import FilterMenu from "../../Components/SearchResults/FilterMenu/FilterMenu";
import {
  clearFilters,
  getCategories,
  getTags,
  setPagination,
  setQueryString,
  setRating,
  vendorSearch,
} from "../../Redux/Slices/searchSlice";
import "./SearchResults.css";
import RiseLoader from "react-spinners/RiseLoader";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../../Components/SearchResults/SearchBar/SearchBar";
import { getAllFavoriteVendors } from "../../Redux/Slices/profileSlice";

const SearchResults = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const _categories = useSelector((state) => state.search.categories);
  const _tags = useSelector((state) => state.search.tags);
  const result = useSelector((state) => state.search.result);
  const pagination = useSelector((state) => state.search.pagination);
  const loading = useSelector((state) => state.search.loading);
  const searchParams = useSelector((state) => state.search.searchParams);
  const location = useLocation();
  const favoriteVendors = useSelector((state) => state.profile.favoriteVendors);

  const override = {
    display: "block",
    margin: "30vh auto",
  };

  useEffect(() => {
    // const queryParams = new URLSearchParams(location.search);
    // let rating = queryParams.get('filters[rating]');
    // if (rating) {
    //   rating = rating.split(',').map(rate => parseInt(rate));
    //   dispatch(setRating(rating));
    // }
    dispatch(getAllFavoriteVendors());
    dispatch(getCategories());
    dispatch(getTags());
    (async function fetchData() {
      await dispatch(clearFilters());
      dispatch(vendorSearch());
    })();
  }, []);

  const handlePageChange = async (event, page) => {
    await dispatch(
      setPagination({
        ...pagination,
        currentPage: page,
      })
    );
  
    dispatch(vendorSearch());
  
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }, 0);
  };
  
  const handleSearchItemClick = (evnet, placeId) => {
    navigate(`/place/${placeId}`);
  };

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
  };

  return (
    <>
      <SearchBar />
      <Container className="d-flex flex-column gap-5 flex-md-row align-items-stretch align-items-md-start flex-fill mt-4">
        <div className="filter-menu d-block">
          <FilterMenu title="Rating" />
          <FilterMenu
            title="Categories"
            options={_categories.map((category) => {
              return { id: category._id, name: category.name };
            })}
          />
          <FilterMenu
            title="Tags"
            options={_tags.map((tag) => {
              return { id: tag._id, name: tag.name };
            })}
          />
          <FilterMenu title="Location" />
          <FilterMenu title="Sort" />
          <Button variant="contained" fullWidth onClick={searchWithFilters}>Apply Filters</Button>
        </div>
        {loading || result[0] === 'Still Loading...' ? (
          <RiseLoader
            color={theme.palette.primary.main}
            loading={loading}
            cssOverride={override}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : result.length > 0 ? (
          <div className="search-results d-flex flex-column align-items-stretch">
            <Typography variant="body" className="mb-3 d-block">
              {pagination.total} places found
            </Typography>
            {result.map((place, index) => {
              return index ? (
                <div key={place._id}>
                  <hr className="divider" />
                  <SearchItem place={place} onClick={(event) => handleSearchItemClick(event, place._id)} />
                </div>
              ) : (
                <SearchItem key={place._id} place={place} onClick={(event) => handleSearchItemClick(event, place._id)} />
              );
            })}
            <Pagination
              count={pagination.totalPages}
              page={pagination.currentPage}
              onChange={handlePageChange}
              color="primary"
              style={{ marginTop: 48, alignSelf: "center" }}
            />
          </div>
        ) : (
          <Typography variant="h2" className="mb-3 d-block text">No results found</Typography>
        )}
      </Container>
    </>
  );
};

export default SearchResults;
