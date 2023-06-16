import { Pagination, Typography, useTheme, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import SearchItem from "../../Components/SearchResults/SearchItem/SearchItem";
import FilterMenu from "../../Components/SearchResults/FilterMenu/FilterMenu";
import {
  clearFilters,
  getCategories,
  getTags,
  setPagination,
  vendorSearch,
} from "../../Redux/Slices/searchSlice";
import "./SearchResults.css";
import RiseLoader from "react-spinners/RiseLoader";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../Components/SearchResults/SearchBar/SearchBar";

const SearchResults = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const _categories = useSelector((state) => state.search.categories);
  const _tags = useSelector((state) => state.search.tags);
  const result = useSelector((state) => state.search.result);
  const pagination = useSelector((state) => state.search.pagination);
  const loading = useSelector((state) => state.search.loading);

  const categories = useSelector((state) => state.search.selectedCategories);
  const tags = useSelector((state) => state.search.selectedTags);

  const override = {
    display: "block",
    margin: "30vh auto",
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getTags());
    (async function fetchData() {
      await dispatch(clearFilters());
      dispatch(vendorSearch());
    })();
  }, []);

  const rating = [
    { id: 1, name: "Below 3" },
    { id: 2, name: "From 3 to 4" },
    { id: 3, name: "Above 4" },
  ];

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

  return (
    <>
      <SearchBar />
      <Container className="d-flex flex-column-reverse gap-5 flex-md-row align-items-stretch align-items-md-start flex-fill mt-4">
        <div className="filter-menu d-block">
          <FilterMenu title="Rating" options={rating} />
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
        </div>
        {loading ? (
          <RiseLoader
            color={theme.palette.primary.main}
            loading={loading}
            cssOverride={override}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <div className="search-results d-flex flex-column align-items-stretch">
            <Typography variant="body" className="mb-3 d-block">
              {pagination.total} places found
            </Typography>
            {result.map((place, index) => {
              return index ? (
                <div key={place._id}>
                  <hr
                    style={{
                      width: "100%",
                      color: "#9095A0",
                      borderWidth: 2,
                      margin: "24px 0",
                    }}
                  />
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
        )}
      </Container>
    </>
  );
};

export default SearchResults;
