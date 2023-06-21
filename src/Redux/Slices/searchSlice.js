import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../Axios'
const URL = '/api/v1'

const initialState = {
    result: ['Still Loading...'],
    pagination: {
        currentPage: 1,
        perPage: 5,
    },
    queryString: '',
    searchParams: {
        category: [],
        tags: [],
        country: [],
        state: [],
        city: [],
        search: [],
        rating: [0, 5],
        sortField: [],
        sortOrder: [],
    },
    // keyword: '',
    categories: [],
    tags: [],
    rating: [],
    vendorsNames: [],
    loading: false,
    error: 'null',
};

export const vendorSearch = createAsyncThunk('search/vendorSearch', async (_, thunkAPI) => {
    try {
        // const response = await axiosInstance.get(`${URL}/vendors?filters[isApproved]=true&${initialState.queryString}`)
        const { search } = thunkAPI.getState();
        const { currentPage, perPage } = search.pagination;
        const queryString = search.queryString;

        const query = `${URL}/auth/search?page=${currentPage}&limit=${perPage}&${queryString}`
        console.log(query)

        const response = await axiosInstance.get(query)
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

export const getVendorsNames = createAsyncThunk('search/getVendorsNames', async (thunkAPI) => {
    try {
        const response = await axiosInstance.get(`${URL}/auth/vendorsNames`)
        return response.data
    } catch (error) {
        if (error.response.data.message === 'UnAuthorized..!') {
            localStorage.clear()
            window.location.href = '/login'
        }
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const alterArray = (array, value) => {
    const index = array.indexOf(value);
    if (index !== -1) {
        array.splice(index, 1);
    } else {
        array.push(value);
    }
    return array;
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setFilters(state, action) {
            const { data, type } = action.payload
            switch (type) {
                case 'Tags':
                    state.searchParams.tags = alterArray(state.searchParams.tags, data.id);
                    break;
                case 'Categories':
                    state.searchParams.category[0] = data.id;
                    break;
                case 'Rating':
                    state.searchParams.rating = data;
                    break;
                case 'Sort':
                    state.searchParams.sortField[0] = data.sortField
                    state.searchParams.sortOrder[0] = data.sortOrder
                    break;
            }
        },
        clearFilters(state) {
            Object.values(state.searchParams).forEach((filterArray) => {
                filterArray.length = 0
            })
        },
        setPagination(state, action) {
            state.pagination = action.payload
        },
        setQueryString(state, action) {
            state.queryString = action.payload
        },
        setKeyword(state, action) {
            state.keyword = action.payload
        },
        setRating(state, action) {
            state.searchParams.rating = action.payload
        },
        setCountry(state, action) {
            state.searchParams.country[0] = action.payload
        },
        setState(state, action) {
            state.searchParams.state[0] = action.payload
        },
        setCity(state, action) {
            state.searchParams.city[0] = action.payload
        },
        setPlaceName(state, action) {
            state.searchParams.search[0] = action.payload
        },
    },
    extraReducers: {
        [vendorSearch.pending]: (state) => {
            state.loading = true
        },
        [vendorSearch.fulfilled]: (state, action) => {
            state.result = action.payload.data
            state.pagination = action.payload.pagination
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
        [getVendorsNames.pending]: (state) => {
            state.loading = true
        },
        [getVendorsNames.fulfilled]: (state, action) => {
            state.vendorsNames = action.payload.vendorNames
            state.loading = false
        },
        [getVendorsNames.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
    },
})

export const { 
    setFilters, 
    setPagination, 
    setQueryString, 
    clearFilters, 
    setKeyword,
    setRating,
    setCountry,
    setState,
    setCity,
    setPlaceName,
} = searchSlice.actions
export default searchSlice.reducer
