import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../features/usersAllSlice' 
import { Link } from 'react-router-dom' 
import { addfollowerThunk, removeFollowerThunk, selectUserDetails } from '../features/currentUserSlice'
 

const UserCard = ({data}) => {

    const currentUser = useSelector(selectUserDetails)
    const usersAllState = useSelector(selectAllUsers)
    const dispatch = useDispatch()

    const handleFollow = (newFollowerId) => { 
        dispatch(addfollowerThunk(newFollowerId))
    }

    const removeFollowing = (userIdToRemove) => {
        dispatch(removeFollowerThunk(userIdToRemove))
    }
 

  return (
    <div className='bg-white p-2 flex  justify-between items-center w-full'  >

                    <Link to={`/profile/${data.username}`} className='flex items-center  bg-white  gap-2 ' >
                        <div className='w-8 h-8 bg-slate-400 rounded-full uppercase flex items-center justify-center font-semibold text-lg text-white overflow-hidden'> 
                            { data.avatar.url==='' ?  
                                data.firstname[0]
                                :
                                <img src={data.avatar.url} alt="profile" className='w-full h-full object-cover' />
                            }
                        </div>
                        <div className='flex flex-col text-left font-semibold text-xs'>
                            <span>@{data.username}</span> 
                        </div>
                    </Link>
                    <div className='flex items-center'>
                        {
                            currentUser.following.includes(data._id) ? 
                            <button className='px-2 py-1 bg-slate-300 text-black rounded-md font-semibold text-xs  ' onClick={()=>removeFollowing(data._id)}>Unfollow</button> 
                            :
                            <button className='px-2 py-1 bg-blue-500 text-white rounded-md font-semibold text-xs ' onClick={()=>handleFollow(data._id)}>Follow</button> 
                        } 
                    </div>
                </div>
  )
}

export default UserCard