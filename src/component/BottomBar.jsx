import React, { useContext } from 'react'
import { AiFillCompass, AiOutlineCompass } from 'react-icons/ai'
import { GrAddCircle } from 'react-icons/gr'
import { RiHomeFill, RiHomeLine } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'
import { PostContext } from '../App'
import { useSelector } from 'react-redux'
import { selectUserDetails } from '../features/currentUserSlice'

const BottomBar = () => {
    const {createPostModal, setCreatePostModal} = useContext(PostContext)
    const location = useLocation().pathname
    const currentUserState = useSelector(selectUserDetails)

    // console.log(location)
  return (
    <div className='sm:hidden max-w-screen w-full fixed bottom-0 h-fit bg-white flex justify-evenly items-center content-center p-1 gap-1 z-20'> 
         <Link to={'/home'} className={`w-fit   p-1 ${location === '/home' ? 'bg-slate-200' : 'bg-white'} hover:bg-slate-300 rounded-md cursor-pointer stroke-1 flex   items-center gap-2 text-md font-semibold `}> 
            {location === '/home' ? 
              <RiHomeFill size={25}/> :
              <RiHomeLine size={25}/>
            } 
          </Link>
          <Link to={'/discover'} className={`w-fit   p-1 ${location === '/discover' ? 'bg-slate-200' : 'bg-white'} hover:bg-slate-300 rounded-md cursor-pointer stroke-1 flex items-center gap-2 text-md font-semibold  `}>
            {location === '/discover' ? 
              <AiFillCompass size={25}/> :
              <AiOutlineCompass size={25}/>
            } 
          </Link> 
          <button className='w-fit   p-1 hover:bg-slate-300 rounded-md cursor-pointer flex items-center gap-2 font-semibold' onClick={()=>setCreatePostModal(!createPostModal)}>
            <GrAddCircle size={25} strokeWidth={3}/>  
          </button>   
          <Link to={`/profile/${currentUserState.username}`} className={`w-fit   p-1 ${location === '/discover' ? 'bg-slate-200' : 'bg-white'} hover:bg-slate-300 rounded-md cursor-pointer stroke-1 flex items-center gap-2 text-md font-semibold  `}>
            <div className='w-[25px] h-[25px] bg-slate-600 rounded-full'></div>  
          </Link> 
    </div>
  )
}

export default BottomBar