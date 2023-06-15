import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../Axios'
const URL = '/api/v1'

const initialState = {
    result: [],
    location: {
        country: '',
        state: '',
        city: '',
    },
    categories: [],
    tags: [],
    rating: [],
    loading: false,
    error: 'null',
};

export const vendorSearch = createAsyncThunk('search/vendorSearch', async (queryString, thunkAPI) => {
    try {
        // In production, change false to true
        const response = await axiosInstance.get(`${URL}/vendors?filters[isApproved]=false&${queryString}`)
        return response.data
    } catch (error) {
        if (error.response.data.message === 'UnAuthorized..!') {
            localStorage.clear()
            window.location.href = '/login'
        }
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const getCategories = createAsyncThunk('search/getCategories', async (thunkAPI) => {
    try {
        const response = await axiosInstance.get(`${URL}/categories`)
        return response.data.data
    } catch (error) {
        if (error.response.data.message === 'UnAuthorized..!') {
            localStorage.clear()
            window.location.href = '/login'
        }
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const getTags = createAsyncThunk('search/getTags', async (thunkAPI) => {
    try {
        const response = await axiosInstance.get(`${URL}/tags`)
        return response.data.data
    } catch (error) {
        if (error.response.data.message === 'UnAuthorized..!') {
            localStorage.clear()
            window.location.href = '/login'
        }
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: {
        [vendorSearch.pending]: (state) => {
            state.loading = true
        },
        [vendorSearch.fulfilled]: (state, action) => {
            state.result = action.payload.data
            state.pagination = action.payload.pagination
            // console.log(state.result)
            // console.log(state.pagination)
            state.loading = false
        },
        [vendorSearch.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        [getTags.pending]: (state) => {
            state.loading = true
        },
        [getTags.fulfilled]: (state, action) => {
            state.tags = action.payload
            state.loading = false
        },
        [getTags.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        [getCategories.pending]: (state) => {
            state.loading = true
        },
        [getCategories.fulfilled]: (state, action) => {
            state.categories = action.payload
            state.loading = false
        },
        [getCategories.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
    },
})

export default searchSlice.reducer
