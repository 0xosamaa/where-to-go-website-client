import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../Axios'
const URL = '/api/v1/auth'

const initialState = {
    countries: [],
    states: [],
    cities: [],
};

export const getCountries = createAsyncThunk('location/getCountries', async (thunkAPI) => {
    try {
        const response = await axiosInstance.get(`${URL}/countries`)
        return response.data
    } catch (error) {
        if (error.response.data.message === 'UnAuthorized..!') {
            localStorage.clear()
            window.location.href = '/login'
        }
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const getStates = createAsyncThunk('location/getStates', async (thunkAPI) => {
    try {
        const response = await axiosInstance.get(`${URL}/states`)
        return response.data
    } catch (error) {
        if (error.response.data.message === 'UnAuthorized..!') {
            localStorage.clear()
            window.location.href = '/login'
        }
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const getCities = createAsyncThunk('location/getCities', async (thunkAPI) => {
    try {
        const response = await axiosInstance.get(`${URL}/cities`)
        return response.data
    } catch (error) {
        if (error.response.data.message === 'UnAuthorized..!') {
            localStorage.clear()
            window.location.href = '/login'
        }
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {},
    extraReducers: {
        [getCountries.fulfilled]: (state, action) => {
            state.countries = action.payload.countries
        },
        [getStates.fulfilled]: (state, action) => {
            state.states = action.payload.states
        },
        [getCities.fulfilled]: (state, action) => {
            state.cities = action.payload.cities
        },
    },
})

export default locationSlice.reducer
