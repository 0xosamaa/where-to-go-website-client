import { createSlice } from '@reduxjs/toolkit'

const hasToken = localStorage.getItem('token') !== null;
const initialState = {
    isLoggedIn: hasToken,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
    },
})

export const { setIsLoggedIn } = authSlice.actions
export default authSlice.reducer
