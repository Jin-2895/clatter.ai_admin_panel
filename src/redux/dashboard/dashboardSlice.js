import { createSlice } from '@reduxjs/toolkit'
import { dashAction } from './dashboardAction'


const initialState = {
    dashboardData: null,
    dashboardLoading: 'idle',
    dashboardError: null,
}

export const dashSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(dashAction.pending, (state, action) => {
            if (state.dashboardLoading === 'idle') {
                state.dashboardLoading = 'pending'
            }
        })
        builder.addCase(dashAction.fulfilled, (state, action) => {
            if (state.dashboardLoading === 'pending') {
                state.dashboardData = action.payload
                state.dashboardLoading = 'idle'
            }
        })
        builder.addCase(dashAction.rejected, (state, action) => {
            if (state.dashboardLoading === 'pending') {
                state.dashboardLoading = 'idle'
                state.dashboardError = action.payload
            }
        })
    }
})


export default dashSlice.reducer