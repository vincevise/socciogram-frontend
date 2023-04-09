import axios from "axios";


export const axiosInstance = axios.create({
    // baseURL:"http://localhost:4000/api",
    baseURL:"https://cobalt-blue-cod-wig.cyclic.app/api"
})

export const getToken = async(data) =>{
    console.log(data)
    const response = await axiosInstance.post('/user/token',data).catch((err)=>console.error(err))
    // console.log(response.data)
    return response.data
}

export const postNewUser = async(data) => {
    // console.log(data)
    const response = await axiosInstance.post('/user/registerUser', data)
    return response.data
}

export const loginUser = async(data) => { 
    const response = await axiosInstance.post('/user/loginUser',data)
    // console.log(response, 'check api.js loginUser')
    return response.data
}

export const loginJWT = async() => { 
    const token = localStorage.getItem('token')
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axiosInstance.post('/user/loginWithToken',{},config) 
    
    // console.log(response.data)
    return response.data
}

export const getAllUsers = async()=>{
    const token = localStorage.getItem('token')
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axiosInstance.post('/user/getAllUsers',{},config) 
    return response.data
}

export const getAllUsers1 = async()=>{
    
    const response = await axiosInstance.get('/user/getAllUsers1') 
    return response.data
}

export const followUser = async(newFollowerId)=>{ 
    // console.log(newFollowerId)
    const token = localStorage.getItem('token')
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axiosInstance.put('/user/addfollower',{newFollowerId},config) 
    return response.data
}

export const removeUser = async(userIdToRemove) => {
    const token = localStorage.getItem('token')
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axiosInstance.put('/user/removefollowing',{userIdToRemove},config) 
    return response.data
}