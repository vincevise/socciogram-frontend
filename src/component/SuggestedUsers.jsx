import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../features/usersAllSlice' 
import { Link } from 'react-router-dom'
import UserCard from './UserCard'
import { selectUserDetails } from '../features/currentUserSlice'

const SuggestedUsers = () => {
 
  const usersAllState = useSelector(selectAllUsers) 
 
  return (
    <div className='fixed w-64 right-4 mt-[10px] bg-white px-3 py-2 rounded-md hidden lg:block z-[2] font-roboto'>
        <h1 className='w-full flex items-center justify-between mb-2'><span className='font-semibold text-sm text-slate-500'>Suggested Users</span> <Link to={'/explore'} className='text-xs font-semibold text-blue-600 active:text-blue-300'>See all</Link></h1>
        {usersAllState.slice(0, 5).map((x,i)=>{
            return (<UserCard data={x} key={x._id}/>)
        })}
    </div>
  )
}

export default SuggestedUsers