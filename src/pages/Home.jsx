import React, { memo, useEffect, } from 'react'
import SuggestedUsers from '../component/SuggestedUsers'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, selectPosts } from '../features/postsSlice'
import Posts from '../component/Posts'

const Home = () => {
 
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchPosts('home'))
  },[])

  
  return (
    < div className=' w-11/12 sm:w-8/12 lg:w-fit flex relative mx-auto mb-10' >
        <Posts/>
        <SuggestedUsers key={'asd'}/>
    </div>
  )
}

export default memo(Home)