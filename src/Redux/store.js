import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "./Slices/profileSlice.js";
import searchReducer from "./Slices/searchSlice";
import placeReducer from "./Slices/placeSlice";

const store = configureStore({
    reducer: {
        profile: profileReducer,
        search: searchReducer,
        place: placeReducer,
    }
})

export default store
