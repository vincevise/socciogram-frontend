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
    < div className=' w-full sm:w-8/12 lg:w-fit flex relative px-10 sm:mx-auto ' >
        <Posts/>
        <SuggestedUsers key={'asd'}/>
    </div>
  )
}

export default memo(Home)