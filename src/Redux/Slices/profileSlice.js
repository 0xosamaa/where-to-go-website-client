import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const URL = 'http://localhost:8001/api/v1/customers'
//import axios from './../../Axios'
//const URL = '/api/v1/employees'

const initialState = {
    customer: {},
    loading: false,
    error: null,
}


export const getCustomer = createAsyncThunk('profile/getCustomer', async (id, thunkAPI) => {
    try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODhlOTEzN2RjZWQxN2ZmNzRmMDU3ZSIsInJvbGUiOiJDdXN0b21lciIsImlhdCI6MTY4NjczNzM2MiwiZXhwIjoxNjk0NTEzMzYyfQ.u0bD8-QNb0ZYGKKI2eOofLkTcgT7tXgTy9y-RBRB-zg'
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


export const updateCustomer = createAsyncThunk(
    'profile/updateCustomer',
    async (customer, thunkAPI) => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODhlOTEzN2RjZWQxN2ZmNzRmMDU3ZSIsInJvbGUiOiJDdXN0b21lciIsImlhdCI6MTY4NjczNzM2MiwiZXhwIjoxNjk0NTEzMzYyfQ.u0bD8-QNb0ZYGKKI2eOofLkTcgT7tXgTy9y-RBRB-zg'
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
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODhlOTEzN2RjZWQxN2ZmNzRmMDU3ZSIsInJvbGUiOiJDdXN0b21lciIsImlhdCI6MTY4NjczNzM2MiwiZXhwIjoxNjk0NTEzMzYyfQ.u0bD8-QNb0ZYGKKI2eOofLkTcgT7tXgTy9y-RBRB-zg'
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
        [getCustomer().pending]: (state, action) => {
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
        }
    },
})

export const { setEmployee, clearEmployee } = profileSlice.actions
export default profileSlice.reducer