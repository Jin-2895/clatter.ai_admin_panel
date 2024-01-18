// ** Redux Imports
import axios from "axios"
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Domain } from "../../utility/Domain"
import Toasts from "../../@core/components/react-toast"



export const adminBillingAction = createAsyncThunk('/admin-billing', async (arg, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.get(`${Domain}/admin-billing?plan=${arg.plan}&status=${arg.status}&keyword=${arg.keyword}&page=${arg.page}&limit=${arg.limit}&flag=${arg.flag}`, config)
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

export const subAction = createAsyncThunk('users/buy-subscription-for-user', async (arg, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.post(`${Domain}/buy-subscription-for-user`, arg, config)
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

export const cancelSubAction = createAsyncThunk('users/cancel-user-subscription', async (arg, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.delete(`${Domain}/cancel-user-subscription/${arg}`, config)
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