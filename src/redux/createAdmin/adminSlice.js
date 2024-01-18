import { createSlice } from '@reduxjs/toolkit'
import { createAdminAction, deactivateAdminAction, deleteAdminAction, getAdminAction, updateAdminAction } from './adminAction'


const initialState = {
    getAdminData: null,
    getAdminLoading: 'idle',
    getAdminError: null,

    createAdminData: null,
    createAdminLoading: 'idle',
    createAdminError: null,

    updateAdminData: null,
    updateAdminLoading: 'idle',
    updateAdminError: null,

    deleteAdminData: null,
    deleteAdminLoading: 'idle',
    deleteAdminError: null,

    deactivateAdminData: null,
    deactivateAdminLoading: 'idle',
    deactivateAdminError: null,
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearGetAdminData: (state) => {
            state.getAdminData = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAdminAction.pending, (state, action) => {
            if (state.getAdminLoading === 'idle') {
                state.getAdminLoading = 'pending'
            }
        })
        builder.addCase(getAdminAction.fulfilled, (state, action) => {
            if (state.getAdminLoading === 'pending') {
                state.getAdminData = action.payload
                state.getAdminLoading = 'idle'
            }
        })
        builder.addCase(getAdminAction.rejected, (state, action) => {
            if (state.getAdminLoading === 'pending') {
                state.getAdminLoading = 'idle'
                state.getAdminError = action.payload
            }
        })
        builder.addCase(createAdminAction.pending, (state, action) => {
            if (state.createAdminLoading === 'idle') {
                state.createAdminLoading = 'pending'
            }
        })
        builder.addCase(createAdminAction.fulfilled, (state, action) => {
            if (state.createAdminLoading === 'pending') {
                state.createAdminData = action.payload
                state.createAdminLoading = 'idle'
            }
        })
        builder.addCase(createAdminAction.rejected, (state, action) => {
            if (state.createAdminLoading === 'pending') {
                state.createAdminLoading = 'idle'
                state.createAdminError = action.payload
            }
        })
        builder.addCase(updateAdminAction.pending, (state, action) => {
            if (state.updateAdminLoading === 'idle') {
                state.updateAdminLoading = 'pending'
            }
        })
        builder.addCase(updateAdminAction.fulfilled, (state, action) => {
            if (state.updateAdminLoading === 'pending') {
                state.updateAdminData = action.payload
                state.updateAdminLoading = 'idle'
            }
        })
        builder.addCase(updateAdminAction.rejected, (state, action) => {
            if (state.updateAdminLoading === 'pending') {
                state.updateAdminLoading = 'idle'
                state.updateAdminError = action.payload
            }
        })
        builder.addCase(deleteAdminAction.pending, (state, action) => {
            if (state.deleteAdminLoading === 'idle') {
                state.deleteAdminLoading = 'pending'
            }
        })
        builder.addCase(deleteAdminAction.fulfilled, (state, action) => {
            if (state.deleteAdminLoading === 'pending') {
                state.deleteAdminData = action.payload
                state.deleteAdminLoading = 'idle'
            }
        })
        builder.addCase(deleteAdminAction.rejected, (state, action) => {
            if (state.deleteAdminLoading === 'pending') {
                state.deleteAdminLoading = 'idle'
                state.deleteAdminError = action.payload
            }
        })
        builder.addCase(deactivateAdminAction.pending, (state, action) => {
            if (state.deactivateAdminLoading === 'idle') {
                state.deactivateAdminLoading = 'pending'
            }
        })
        builder.addCase(deactivateAdminAction.fulfilled, (state, action) => {
            if (state.deactivateAdminLoading === 'pending') {
                state.deactivateAdminData = action.payload
                state.deactivateAdminLoading = 'idle'
            }
        })
        builder.addCase(deactivateAdminAction.rejected, (state, action) => {
            if (state.deactivateAdminLoading === 'pending') {
                state.deactivateAdminLoading = 'idle'
                state.deactivateAdminError = action.payload
            }
        })

    }
})

export const { clearGetAdminData } = adminSlice.actions;
export default adminSlice.reducer