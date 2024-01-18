

// ** Redux Imports
import axios from "axios"
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Domain } from "../../utility/Domain"
import Toasts from "../../@core/components/react-toast"

export const getAdminAction = createAsyncThunk('users/all-admin', async (arg, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.get(`${Domain}/all-admins?page=${arg.page}&limit=${arg.limit}&keyword=${arg.keyword}&status=${arg.status}`, config)
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

export const createAdminAction = createAsyncThunk('users/admin-create', async (arg, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.post(`${Domain}/admin-create`, arg, config)
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

export const updateAdminAction = createAsyncThunk('users/admin-update-by-id', async ({ formData, id }, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.put(`${Domain}/admin-update-by-id/${id}`, formData, config)
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

export const deleteAdminAction = createAsyncThunk('users/admin-delete', async (arg, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.delete(`${Domain}/admin-delete/${arg}`, config)
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

export const deactivateAdminAction = createAsyncThunk('users/update-admin-status', async (arg, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.put(`${Domain}/update-admin-status/${arg.id}`, { status: arg.status }, config)
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