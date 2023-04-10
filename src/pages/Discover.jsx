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
    < div className=' w-11/12 sm:w-8/12 lg:w-fit flex relative mx-auto mb-10' >
        <Posts/>
        <SuggestedUsers key={'asd'}/>
    </div>
  )
}

export default Discover