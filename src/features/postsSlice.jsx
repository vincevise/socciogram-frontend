import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../api/api";
import { fetchUsers } from "./usersAllSlice";

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async(page)=>{
    let api = '/posts/getPostHome'

    if(page==='discover'){
        api = '/posts/getPostDiscover'
    } 

    const token = localStorage.getItem('token')
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axiosInstance.post(`${api}`,{},config)  
    // console.log(response.data, 'fetch users')
    return response.data
})

export const fetchPostLikes = createAsyncThunk('posts/fetchPostLikes', async(body)=>{
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    };
    const response = await axiosInstance.post('/posts/likePost',body, config)
    return response.data
})

export const fetchPostUsers = createAsyncThunk('posts/fetchPostsUsers', async(body)=>{
    
    const response = await axiosInstance.get(`/posts/profile/${body}`)
    return response.data
})

export const fetchCommentPosts = createAsyncThunk('comments/fetchCommentPosts', async(body)=>{
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axiosInstance.post(`/comments/create-comment`, body,config )
    return response.data
})

export const deleteCommentThunk = createAsyncThunk('comments/deleteCommentThunk', async(data)=>{ 
    console.log(data);
    const response = await axiosInstance.delete('/comments/delete-comment', {data:data})
    return response.data
})

export const editCommentThunk = createAsyncThunk('comments/editCommentThunk', async(data)=>{
    console.log(data)
    const response = await axiosInstance.put('/comments/update-comment',{data:data})
    return response.data
})

const initialState = {
    posts:[],
    loading:false,
    error:false
}

const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending, (state,action)=>{
                state.loading = true
            })
            .addCase(fetchPosts.fulfilled, (state,action)=>{
                // console.log(action.payload, 'action.payload')
                state.posts = action.payload
                state.loading = false
            })
            .addCase(fetchPostUsers.pending, (state,action)=>{
                state.loading= true
            })
            .addCase(fetchPostUsers.fulfilled, (state,action)=>{
                // console.log(action.payload)
                state.posts = action.payload
                state.loading = false
            })
            .addCase(fetchPostLikes.fulfilled, (state, action)=>{
                // console.log(action.payload, 'action payload')
                const {post} = action.payload
                state.posts.forEach((x)=>{
                    if(post._id === x._id){
                        x.likes = post.likes
                    }
                })
            })
            .addCase(fetchCommentPosts.fulfilled, (state, action)=>{ 
                state.posts.forEach((x)=>{
                     
                    if(x._id === action.payload.comment.post){
                        x.comments.unshift(action.payload.comment)
                    }
                }) 
            })
            .addCase(deleteCommentThunk.fulfilled,(state, action)=>{
                console.log(action.payload)
                const {comment, post} = action.payload
                state.posts.forEach((x)=>{
                    if(post === x._id){
                        x.comments = x.comments.filter((z)=>z._id!==comment)
                    }
                })
            }) 
            .addCase(editCommentThunk.fulfilled, (state, action)=>{
                console.log(action.payload)
                const {comment} = action.payload

                state.posts.forEach((post)=>{
                    if( post._id === comment.post ){
                        post.comments.forEach((x)=>{
                            if(x._id === comment._id){
                                x.text = comment.text
                            }
                        })
                    }
                })
            })
    }
})

export const selectPosts = (state) => state.posts

export default postsSlice.reducer