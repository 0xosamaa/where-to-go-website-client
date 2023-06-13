import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const URL = 'http://localhost:8001/api/v1/customer'
//import axios from './../../Axios'
//const URL = '/api/v1/employees'

const initialState = {
    customer: {},
    loading: false,
    error: 'null',
}


export const getCustomer = createAsyncThunk('profile/getCustomer', async (id, thunkAPI) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return response.data
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
            const token = localStorage.getItem('token')
            const response = await axios.put(`${URL}/${customer.get('_id')}`, customer, {
                headers: { Authorization: `Bearer ${token}` },
            })
            return response.data
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
    async (data, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.put(`${URL}/change-password/${data.get('_id')}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            })
            return response.data
        } catch (error) {
            if (error.response.data.message === 'UnAuthorized..!') {
                localStorage.clear()
                window.location.href = '/login'
            }
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
            state.employee = action.payload
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
            state.employees = state.employees.map((employee) =>
                employee._id === action.payload._id ? action.payload : employee,
            )
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
        },
        [changePassword.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    },
})

export const { setEmployee, clearEmployee } = profileSlice.actions
export default profileSlice.reducer