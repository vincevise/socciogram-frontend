import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance, loginUser, postNewUser } from "../api/api"
import { useSelector } from "react-redux"

export const createUser = createAsyncThunk('user/registerUser',async(data)=>{
    const response = await postNewUser(data) 
    return response
})

export const loginUserThunk = createAsyncThunk('user/loginUser', async(data)=>{
    const response = await loginUser(data) 
    localStorage.setItem('token',response.token)
    return response
})

export const addfollowerThunk = createAsyncThunk('user/addFollower', async(newFollowerId)=>{  
    const token = localStorage.getItem('token')
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axiosInstance.put('/user/addfollower',{newFollowerId},config) 
    return response.data
})

export const removeFollowerThunk = createAsyncThunk('user/removeFollower', async(userIdToRemove)=>{
    const token = localStorage.getItem('token')
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axiosInstance.put('/user/removefollowing',{userIdToRemove},config) 
    return response.data
})


export const uploadPhotoThunk = createAsyncThunk('user/imageUploadThunk', async(imageData)=>{
    const token = localStorage.getItem('token')
    const config = {
        headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
    };

    const response = await axiosInstance.post('/user/uploadProfile',imageData, config)
    return response.data
})

export const updateBioThunk = createAsyncThunk('user/updateBioThunk', async(bio)=>{
    console.log(bio)
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    };
    const response = await axiosInstance.post('/user/updateBio',{bio:bio}, config)
    return response.data
})

 



const initialState = { 
    firstname:'',
    lastname:'',
    username:'',
    email:'', 
    following:'',
    followers:'',
    avatar:{},
    _id:'',
    authenticated:false,
    loading:true
} 

const currentUserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        userAuth(state,action){
            const {username, email, lastname, firstname, following, followers, avatar, _id} = action.payload 
            state.firstname = firstname
            state.lastname = lastname
            state.username = username
            state.email = email
            state.following = following
            state.followers = followers
            state.avatar = avatar
            state._id = _id
            state.authenticated = true
            state.loading = false
        },
        userlogout(state,action){
            state.firstname = ''
            state.lastname = ''
            state.username = ''
            state.email = ''
            state.followers = ''
            state.following = ''
            state.avatar = {
                name:'',
                url:''
            }
            state.authenticated = false
            state.loading = false
        }
    },
    extraReducers(builder){
        builder
        .addCase(createUser.fulfilled,(state,action)=>{
            const {username, email, lastname, firstname, _id} = action.payload.data 
            const {token} = action.payload 

            localStorage.setItem('token',token)

            state._id = _id
            state.firstname = firstname
            state.lastname = lastname
            state.username = username
            state.email = email 
            state.authenticated = true
            state.loading = false
        })
        .addCase(createUser.pending,(state, action)=>{
            state.loading = true
        })
        .addCase(loginUserThunk.fulfilled, (state,action)=>{ 
            const {isUser, token} = action.payload
            state.firstname = isUser.firstname
            state.lastname = isUser.lastname
            state.username = isUser.username
            state.followers = isUser.followers
            state.following = isUser.following
            state.email = isUser.email  
            state.avatar = isUser.avatar  
            state._id = isUser._id
            state.authenticated = true
            state.loading = false
        })
        .addCase(loginUserThunk.pending, (state, action)=>{
            state.loading = true
        }) 
        .addCase(addfollowerThunk.fulfilled, (state,action)=>{
            
            const {currentUser, followingUser} = action.payload  
            state.following = currentUser.following
        })
        .addCase(removeFollowerThunk.fulfilled,(state,action)=>{
            const {currentUser, followingUser} = action.payload
            state.following = currentUser.following
        })
        .addCase(uploadPhotoThunk.fulfilled,(state,action)=>{
            // console.log(action.payload)
            const {url, key} = action.payload
            state.avatar = {
                url,
                name:key
            }
        })
        .addCase(updateBioThunk.fulfilled,(state, action)=>{
            const {bio} = action.payload.user
            state.bio = bio
        })
    }
})

export const selectUserDetails = (state) =>state.user

export const {userAuth, userlogout} = currentUserSlice.actions

export default currentUserSlice.reducer