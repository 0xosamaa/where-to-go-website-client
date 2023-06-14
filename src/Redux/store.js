import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "./Slices/profileSlice.js";
import searchReducer from "./Slices/searchSlice";

const store = configureStore({
    reducer: {
        profile: profileReducer,
        search: searchReducer,
    }
})

export default store
