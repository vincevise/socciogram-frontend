import React from 'react'
import { selectPosts } from '../features/postsSlice'
import { useSelector } from 'react-redux'
import { Oval } from 'react-loader-spinner'
import PostCard1 from './PostCard1'
import Loader from './Loader'
import { useLocation, useNavigate } from 'react-router-dom'

const Posts = () => {
    const location = useLocation()
    const postState = useSelector(selectPosts)
    if(postState.loading){
        return (
            <Loader/>
        )
    }

    console.log(location.pathname)
     
  return (
    <div className=' z-10 mx-auto h-full'>
        {location.pathname === '/discover' 
            ? 
            <>
            {postState.posts.map((x)=> <PostCard1 data={x} key={x._id}/>)} 
            </> 
            :
            <>
            {postState.posts.length === 0 ? <div className='font-semibold w-64 lg:w-4/6 inset-0 mt-24 mx-auto'>Oops, it looks like you're not following anyone yet. In order to see posts, you'll need to follow at least one person.</div> : postState.posts.map((x)=> <PostCard1 data={x} key={x._id}/>)}
            </> 
        }
        </div>
    )
}

export default Posts