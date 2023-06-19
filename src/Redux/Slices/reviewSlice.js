import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../Axios'
const URL = '/api/v1/reviews'

const initialState = {
    reviews: [],
};

export const addReview = createAsyncThunk('revews/addRevew', async (data, thunkAPI) => {
    try {
        const response = await axiosInstance.post(URL, data)
        return response.data
    } catch (error) {
        if (error.response.data.message === 'UnAuthorized..!') {
            localStorage.clear()
            window.location.href = '/login'
        }
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {},
    extraReducers: {
        [addReview.fulfilled]: (state, action) => {
            console.log(action.payload.success)
        },
    },
})

// export const { } = reviewSlice.actions
export default reviewSlice.reducer
