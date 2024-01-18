// ** Redux Imports
import axios from "axios"
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Domain } from "../../utility/Domain"
import Toasts from "../../@core/components/react-toast"


export const dashAction = createAsyncThunk('users/dashboard', async (arg, { rejectWithValue }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"))
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            }
        }
        const response = await axios.get(`${Domain}/admin-dashboard`, config)
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