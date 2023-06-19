import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "./Slices/profileSlice.js";
import searchReducer from "./Slices/searchSlice";
import placeReducer from "./Slices/placeSlice";
import reviewReducer from "./Slices/reviewSlice.js"
import authReducer from "./Slices/authSlice.js";

const store = configureStore({
    reducer: {
        profile: profileReducer,
        search: searchReducer,
        place: placeReducer,
        review: reviewReducer,
        auth: authReducer,
    }
})

export default store
