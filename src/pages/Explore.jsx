import React from 'react'
import { selectAllUsers } from '../features/usersAllSlice'
import { useSelector } from 'react-redux'
import UserCard from '../component/UserCard'

const Explore = () => {
    const usersAllState = useSelector(selectAllUsers) 
  return (
    <div className='w-11/12 md:w-1/2 sm:w-4/6 mt-[10px] mx-auto p-2 bg-white rounded-lg'>
        <h1 className='text-left p-2 text-xl   mb-2'>Explore</h1>
       {usersAllState.map((x,i)=>{
            return (
              <div  key={x.id}>
                <hr />
                <div  >
                    <UserCard data={x}/>
                </div>
              </div>
            )
        })}
    </div>
  )
}

export default Explore