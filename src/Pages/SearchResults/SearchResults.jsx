import { Pagination, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import SearchItem from "../../Components/SearchItem/SearchItem";
import FilterMenu from "../../Components/FilterMenu/FilterMenu";
import {
  getCategories,
  getTags,
  vendorSearch,
} from "../../Redux/Slices/searchSlice";
import "./SearchResults.css";

const SearchResults = () => {
  const dispatch = useDispatch();
  const _categories = useSelector((state) => state.search.categories);
  const _tags = useSelector((state) => state.search.tags);
  const result = useSelector((state) => state.search.result);
  const pagination = useSelector((state) => state.search.pagination)

  const categories = useSelector((state) => state.search.selectedCategories);
  const tags = useSelector((state) => state.search.selectedTags);

  useEffect(() => {
    dispatch(vendorSearch());
    dispatch(getCategories());
    dispatch(getTags());
  }, []);

  const rating = [
    { id: 1, name: "Below 3" },
    { id: 2, name: "From 3 to 4" },
    { id: 3, name: "Above 4" },
  ];

  return (
    <div className="container d-flex flex-column gap-5 flex-md-row align-items-stretch align-items-md-start flex-fill">
      <div className="filter-menu d-block mt-5">
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
      {/* <Typography variant="body">{categories.toString()}</Typography> */}
      <div className="search-results d-flex flex-column align-items-stretch mb-5 my-md-5">
        <Typography variant="body" className="mb-3 d-block">
          {pagination.total} Places in Egypt
        </Typography>
        {(result).map((place, index) => {
            return index ? (
                <div key={place._id}>
                    <hr style={{ width: "100%", color: "#9095A0", borderWidth: 2, margin: "24px 0" }} />
                    <SearchItem place={place} />
                </div>
            ) : (
                <SearchItem key={place._id} place={place} />
            );
        })}
        <Pagination style={{ marginTop: 48, alignSelf: "center" }} count={pagination.totalPages} color="primary" />
      </div>
    </div>
  );
};

export default SearchResults;
