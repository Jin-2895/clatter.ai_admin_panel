import { createSlice } from '@reduxjs/toolkit'
import { authAction } from './authAction'


const initialState = {
    userData: null,
    authLoading: 'idle',
    authError: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleLogout: state => {
            state.userData = null
            // ** Remove user, accessToken from localStorage
            localStorage.removeItem('userData')
            localStorage.removeItem("accessToken")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authAction.pending, (state, action) => {
            if (state.authLoading === 'idle') {
                state.authLoading = 'pending'
            }
        })
        builder.addCase(authAction.fulfilled, (state, action) => {
            if (state.authLoading === 'pending') {
                state.userData = action.payload
                localStorage.setItem('userData', JSON.stringify(action.payload))
                localStorage.setItem("accessToken", JSON.stringify(action.payload.token))
                state.authLoading = 'idle'
            }
        })
        builder.addCase(authAction.rejected, (state, action) => {
            if (state.authLoading === 'pending') {
                state.authLoading = 'idle'
                state.authError = action.payload
            }
        })
    }
})

export const { handleLogout } = authSlice.actions
export default authSlice.reducer