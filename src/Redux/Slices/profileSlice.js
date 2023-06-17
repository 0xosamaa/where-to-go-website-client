import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const URL = 'http://localhost:8001/api/v1/customers'
//import axios from './../../Axios'
//const URL = '/api/v1/employees'

const initialState = {
    customer: {},
    favoriteVendors: [],
    loading: false,
    error: null,
}


export const getCustomer = createAsyncThunk('profile/getCustomer', async (id, thunkAPI) => {
    try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQ4OGU5MTM3ZGNlZDE3ZmY3NGYwNTdlIiwicm9sZSI6IkN1c3RvbWVyIn0sImlhdCI6MTY4NzAzNDUwNiwiZXhwIjoxNjk0ODEwNTA2fQ.pMD-42jIyqrB_26a4eo6wKqtTOXHcf0LYL1B5nPl_yc'
        const response = await axios.get(`${URL}/getMe`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return response.data.data
    } catch (error) {
        if (error.response.data.message === 'UnAuthorized..!') {
            localStorage.clear()
            window.location.href = '/login'
        }
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const getFavoriteVendors = createAsyncThunk(
    'profile/getFavoriteVendors',
    async (currentPage, thunkAPI) => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQ4OGU5MTM3ZGNlZDE3ZmY3NGYwNTdlIiwicm9sZSI6IkN1c3RvbWVyIn0sImlhdCI6MTY4NzAzNDUwNiwiZXhwIjoxNjk0ODEwNTA2fQ.pMD-42jIyqrB_26a4eo6wKqtTOXHcf0LYL1B5nPl_yc'
            const response = await axios.get(`${URL}/myFavorites?page=${currentPage}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            return response.data.data
        } catch (error) {
            if (error.response.data.message === 'UnAuthorized..!') {
                localStorage.clear()
                window.location.href = '/login'
            }
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const deleteFavoriteVendor = createAsyncThunk(
    'profile/deleteFavoriteVendor',
    async (data, thunkAPI) => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQ4OGU5MTM3ZGNlZDE3ZmY3NGYwNTdlIiwicm9sZSI6IkN1c3RvbWVyIn0sImlhdCI6MTY4NzAzNDUwNiwiZXhwIjoxNjk0ODEwNTA2fQ.pMD-42jIyqrB_26a4eo6wKqtTOXHcf0LYL1B5nPl_yc'
            const response = await axios.delete(`${URL}/favorites`, {
                headers: { Authorization: `Bearer ${token}` },
                data: data,
            })
            return response.data
        } catch (error) {
            if (error.response.data.message === 'UnAuthorized..!') {
                localStorage.clear()
                window.location.href = '/login'
            }
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


export const updateCustomer = createAsyncThunk(
    'profile/updateCustomer',
    async (customer, thunkAPI) => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQ4OGU5MTM3ZGNlZDE3ZmY3NGYwNTdlIiwicm9sZSI6IkN1c3RvbWVyIn0sImlhdCI6MTY4NzAzNDUwNiwiZXhwIjoxNjk0ODEwNTA2fQ.pMD-42jIyqrB_26a4eo6wKqtTOXHcf0LYL1B5nPl_yc'
            const response = await axios.put(`${URL}/updateMe`, customer, {
                headers: { Authorization: `Bearer ${token}` },
            })
            return response.data.data
        } catch (error) {
            if (error.response.data.message === 'UnAuthorized..!') {
                localStorage.clear()
                window.location.href = '/login'
            }
            return thunkAPI.rejectWithValue(error.response.data)
        }
    },
)

export const changePassword = createAsyncThunk(
    'profile/changePassword',
    async (passwords, thunkAPI) => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQ4OGU5MTM3ZGNlZDE3ZmY3NGYwNTdlIiwicm9sZSI6IkN1c3RvbWVyIn0sImlhdCI6MTY4NzAzNDUwNiwiZXhwIjoxNjk0ODEwNTA2fQ.pMD-42jIyqrB_26a4eo6wKqtTOXHcf0LYL1B5nPl_yc'
            const response = await axios.put(`${URL}/changeMyPassaowrd`, passwords, {
                headers: { Authorization: `Bearer ${token}` },
            })
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error.response.data)
            return thunkAPI.rejectWithValue(error.response.data)
        }
    },
)




const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: {
        [getCustomer.pending]: (state, action) => {
            state.loading = true
        },
        [getCustomer.fulfilled]: (state, action) => {
            state.customer = action.payload
            state.loading = false
        },
        [getCustomer.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        [updateCustomer.pending]: (state, action) => {
            state.loading = true
        },
        [updateCustomer.fulfilled]: (state, action) => {
            state.customer = action.payload
            state.loading = false
        },
        [updateCustomer.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        [changePassword.pending]: (state, action) => {
            state.loading = true
        },
        [changePassword.fulfilled]: (state, action) => {
            state.loading = false
            state.error = null
        },
        [changePassword.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        [getFavoriteVendors.pending]: (state, action) => {
            state.loading = true
        },
        [getFavoriteVendors.fulfilled]: (state, action) => {
            state.favoriteVendors = action.payload
            state.loading = false
        },
        [getFavoriteVendors.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    },
})

export const { setEmployee, clearEmployee } = profileSlice.actions
export default profileSlice.reducer