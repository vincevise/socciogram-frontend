import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../api/api";

export const fetchUsers = createAsyncThunk('user/fetchUsers', async()=>{
    const token = localStorage.getItem('token')
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axiosInstance.post('/user/suggestedUsers',{},config)  
    // console.log(response.data, 'fetch users')
    return response.data
})

const initialState = {
    users:[],
    loading:false,
    error:false
}

const usersAllSlice = createSlice({
    name:'usersAll',
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder.addCase(fetchUsers.pending,(state,action)=>{ 
            state.loading = true
            state.error = false
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{  
            state.users = action.payload.suggestedusers
            state.loading = false
            state.error = false
        })
    }
})

export const selectAllUsers = (state) =>state.usersAll.users

export default usersAllSlice.reducer