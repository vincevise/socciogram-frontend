import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../api/api"

export const fetchSearchUsers = createAsyncThunk('users/fetchSearchUsers',async(searchTerm)=>{
    const response = await axiosInstance.get(`/user/search?q=${searchTerm}`)
    return response.data
})

const initialState = {
    users:[],
    loading:false,
    error:false
}

const searchSlice = createSlice({
    name:'searchusers',
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder
        .addCase(fetchSearchUsers.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(fetchSearchUsers.fulfilled,(state, action)=>{
            console.log(action.payload)
            state.users = action.payload
            state.loading = false
        })
    }
})

export const selectSearchUsers = (state) => state.searchusers
export default searchSlice.reducer