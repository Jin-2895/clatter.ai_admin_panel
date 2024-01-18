import { createSlice } from '@reduxjs/toolkit'
import { addNewUserAction, allUserAction, singleUserAction, statusUserAction, updateProfileAction, userActivityDetailAction, userSubscriptionDetailAction } from './userAction'


const initialState = {
    allUserData: null,
    allUserLoading: 'idle',
    allUserError: null,

    singleUserData: null,
    singleUserLoading: 'idle',
    singleUserError: null,

    updateUserData: null,
    updateUserLoading: 'idle',
    updateUserError: null,

    userSubDetailsData: null,
    userSubDetailsLoading: 'idle',
    userSubDetailsError: null,

    userActDetailsData: null,
    userActDetailsLoading: 'idle',
    userActDetailsError: null,

    newUserData: null,
    newUserLoading: 'idle',
    newUserError: null,

    statusUserData: null,
    statusUserLoading: 'idle',
    statusUserError: null,
}

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(allUserAction.pending, (state, action) => {
            if (state.allUserLoading === 'idle') {
                state.allUserLoading = 'pending'
            }
        })
        builder.addCase(allUserAction.fulfilled, (state, action) => {
            if (state.allUserLoading === 'pending') {
                state.allUserData = action.payload
                state.allUserLoading = 'idle'
            }
        })
        builder.addCase(allUserAction.rejected, (state, action) => {
            if (state.singleUserLoading === 'pending') {
                state.singleUserLoading = 'idle'
                state.singleUserError = action.payload
            }
        })
        builder.addCase(singleUserAction.pending, (state, action) => {
            if (state.singleUserLoading === 'idle') {
                state.singleUserLoading = 'pending'
            }
        })
        builder.addCase(singleUserAction.fulfilled, (state, action) => {
            if (state.singleUserLoading === 'pending') {
                state.singleUserData = action.payload
                state.singleUserLoading = 'idle'
            }
        })
        builder.addCase(singleUserAction.rejected, (state, action) => {
            if (state.singleUserLoading === 'pending') {
                state.singleUserLoading = 'idle'
                state.singleUserError = action.payload
            }
        })
        builder.addCase(updateProfileAction.pending, (state, action) => {
            if (state.updateUserLoading === 'idle') {
                state.updateUserLoading = 'pending'
            }
        })
        builder.addCase(updateProfileAction.fulfilled, (state, action) => {
            if (state.updateUserLoading === 'pending') {
                state.updateUserData = action.payload
                state.updateUserLoading = 'idle'
            }
        })
        builder.addCase(updateProfileAction.rejected, (state, action) => {
            if (state.updateUserLoading === 'pending') {
                state.updateUserLoading = 'idle'
                state.updateUserError = action.payload
            }
        })
        builder.addCase(userSubscriptionDetailAction.pending, (state, action) => {
            if (state.userSubDetailsLoading === 'idle') {
                state.userSubDetailsLoading = 'pending'
            }
        })
        builder.addCase(userSubscriptionDetailAction.fulfilled, (state, action) => {
            if (state.userSubDetailsLoading === 'pending') {
                state.userSubDetailsData = action.payload
                state.userSubDetailsLoading = 'idle'
            }
        })
        builder.addCase(userSubscriptionDetailAction.rejected, (state, action) => {
            if (state.userSubDetailsLoading === 'pending') {
                state.userSubDetailsLoading = 'idle'
                state.userSubDetailsError = action.payload
            }
        })
        builder.addCase(userActivityDetailAction.pending, (state, action) => {
            if (state.userActDetailsLoading === 'idle') {
                state.userActDetailsLoading = 'pending'
            }
        })
        builder.addCase(userActivityDetailAction.fulfilled, (state, action) => {
            if (state.userActDetailsLoading === 'pending') {
                state.userActDetailsData = action.payload
                state.userActDetailsLoading = 'idle'
            }
        })
        builder.addCase(userActivityDetailAction.rejected, (state, action) => {
            if (state.userActDetailsLoading === 'pending') {
                state.userActDetailsLoading = 'idle'
                state.userActDetailsError = action.payload
            }
        })
        builder.addCase(addNewUserAction.pending, (state, action) => {
            if (state.newUserLoading === 'idle') {
                state.newUserLoading = 'pending'
            }
        })
        builder.addCase(addNewUserAction.fulfilled, (state, action) => {
            if (state.newUserLoading === 'pending') {
                state.newUserData = action.payload
                state.newUserLoading = 'idle'
            }
        })
        builder.addCase(addNewUserAction.rejected, (state, action) => {
            if (state.newUserLoading === 'pending') {
                state.newUserLoading = 'idle'
                state.newUserError = action.payload
            }
        })
        builder.addCase(statusUserAction.pending, (state, action) => {
            if (state.statusUserLoading === 'idle') {
                state.statusUserLoading = 'pending'
            }
        })
        builder.addCase(statusUserAction.fulfilled, (state, action) => {
            if (state.statusUserLoading === 'pending') {
                state.statusUserData = action.payload
                state.statusUserLoading = 'idle'
            }
        })
        builder.addCase(statusUserAction.rejected, (state, action) => {
            if (state.statusUserLoading === 'pending') {
                state.statusUserLoading = 'idle'
                state.statusUserError = action.payload
            }
        })
    }
})

export default userSlice.reducer