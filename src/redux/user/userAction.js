// ** Redux Imports
import axios from "axios"
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Domain } from "../../utility/Domain"
import Toasts from "../../@core/components/react-toast"


export const allUserAction = createAsyncThunk('users/all-users', async (arg, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.get(`${Domain}/get-users?plan=${arg.plan}&status=${arg.status}&page=${arg.page}&limit=${arg.limit}&keyword=${arg.keyword}&subscriptionStatus=${arg.subStatus}&flag=${arg.flag}`, config)

        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            Toasts({ error: error.response.data.message })
            return rejectWithValue(error.response.data.message)
        } else {
            Toasts({ error: error.message })
            return rejectWithValue(error.message)
        }
    }
})

export const singleUserAction = createAsyncThunk('users/single-user', async (arg, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.get(`${Domain}/user-details/${arg}`, config)
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            Toasts({ error: error.response.data.message })
            return rejectWithValue(error.response.data.message)
        } else {
            Toasts({ error: error.message })
            return rejectWithValue(error.message)
        }
    }
})

export const updateProfileAction = createAsyncThunk('users/update-user-profile', async ({ id, formData }, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.put(`${Domain}/update-user-details/${id}`, formData, config)
        Toasts({ message: response.data.message })
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            Toasts({ error: error.response.data.message })
            return rejectWithValue(error.response.data.message)
        } else {
            Toasts({ error: error.message })
            return rejectWithValue(error.message)
        }
    }
})

export const userSubscriptionDetailAction = createAsyncThunk('users/user-subscriptions', async ({ id, page, limit }, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.get(`${Domain}/user-subscriptions/${id}?page=${page}&limit=${limit}`, config)
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            Toasts({ error: error.response.data.message })
            return rejectWithValue(error.response.data.message)
        } else {
            Toasts({ error: error.message })
            return rejectWithValue(error.message)
        }
    }
})

export const userActivityDetailAction = createAsyncThunk('users/user-activity', async ({ id, page, limit }, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.get(`${Domain}/user-activity/${id}?page=${page}&limit=${limit}`, config)
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            Toasts({ error: error.response.data.message })
            return rejectWithValue(error.response.data.message)
        } else {
            Toasts({ error: error.message })
            return rejectWithValue(error.message)
        }
    }
})

export const addNewUserAction = createAsyncThunk('users/add-user', async (arg, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.post(`${Domain}/add-user`, arg, config)
        Toasts({ message: response.data.message })
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            Toasts({ error: error.response.data.message })
            return rejectWithValue(error.response.data.message)
        } else {
            Toasts({ error: error.message })
            return rejectWithValue(error.message)
        }
    }
})

export const statusUserAction = createAsyncThunk('users/user-status', async (arg, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.put(`${Domain}/user-status/${arg.id}`, { status: arg.status }, config)
        Toasts({ message: response.data.message })
        return response.data
    } catch (error) {
        if (error.message && error.response.data.message) {
            Toasts({ error: error.response.data.message })
            return rejectWithValue(error.response.data.message)
        } else {
            Toasts({ error: error.message })
            return rejectWithValue(error.message)
        }
    }
})

