import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "./Slices/profileSlice.js";


const store = configureStore({
    reducer: {
        profile: profileReducer,
    }
})

export default store