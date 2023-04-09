import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance  } from "../api/api"
import axios from "axios"

 
export const fetchOneUser = createAsyncThunk('user/fetchOneUser',async(id)=>{
    const response = await axiosInstance.get(`/user/getOneUser/${id}`) 
    return response.data
})

 


const initialState = { 
    user:{},
    loading:false,
    error:false
} 

const getOneUserSlice = createSlice({
    name:'oneUser',
    initialState,
    reducers:{
        addFollower(state, action){
            // console.log(action.payload)
            state.user.followers.push(action.payload)
            
        },
        removeFollower(state, action){
            console.log(action.payload._id)
            state.user.followers = state.user.followers.filter((x)=>x._id!==action.payload._id)
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchOneUser.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(fetchOneUser.fulfilled,(state,action)=>{ 
            const {user} = action.payload 
            state.user = user 
            state.loading = false
            state.error = false
        }) 
    }
})

export const selectOneUser = (state) => state.oneUser  
 
export const {addFollower, removeFollower} = getOneUserSlice.actions

export default getOneUserSlice.reducer