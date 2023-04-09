import React, { useEffect } from 'react'
import SuggestedUsers from '../component/SuggestedUsers'
import { useDispatch } from 'react-redux'
import { fetchPosts } from '../features/postsSlice'
import PostCard1 from '../component/PostCard1'
import Posts from '../component/Posts'

const Discover = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchPosts('discover'))
  },[])
  return (
    <div className=' w-full sm:w-8/12 lg:w-fit flex relative px-10 sm:mx-auto '>
      <Posts/>
      <SuggestedUsers key={'34d'}/>
    </div>
  )
}

export default Discover