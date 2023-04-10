import React from 'react'
import { selectPosts } from '../features/postsSlice'
import { useSelector } from 'react-redux'
import { Oval } from 'react-loader-spinner'
import PostCard1 from './PostCard1'
import Loader from './Loader'

const Posts = () => {

    const postState = useSelector(selectPosts)
    if(postState.loading){
        return (
            <Loader/>
        )
    }

    // console.log(postState.posts, 'posts')

  return (
    <div className=' z-10 mx-auto'>
        {postState.posts.map((x)=> <PostCard1 data={x} key={x._id}/>)}
    </div>
    )
}

export default Posts