import React, { memo, useContext } from 'react'
import { GrAddCircle } from 'react-icons/gr'
import { RiCompassDiscoverFill, RiCompassDiscoverLine, RiHomeFill, RiHomeLine } from 'react-icons/ri'
import { AiFillCompass, AiOutlineCompass } from 'react-icons/ai'
import { Link, useLocation, useParams } from 'react-router-dom'
import CustomToolTip from './CustomToolTip'
import { PostContext } from '../App'
 

const Sidebar = () => {
  const {createPostModal, setCreatePostModal} = useContext(PostContext)
  const location = useLocation().pathname 

  return (
    <div className='hidden fixed lg:w-[192px] sm:block w-fit bg-white p-2 m-[10px] flex flex-col rounded-md' style={{height:'calc(100vh - 80px)'}}>
        <CustomToolTip title={'Home'} pos='left'>
          <Link to={'/'} className={`w-fit lg:w-full p-[10px] ${location === '/' ? 'bg-slate-200' : 'bg-white'} hover:bg-slate-300 rounded-md cursor-pointer stroke-1 flex items-center gap-2 text-md font-semibold  mb-1`}> 
            {location === '/' ? 
              <RiHomeFill size={25}/> :
              <RiHomeLine size={25}/>
            }
            <span className='sm:hidden lg:block'>Home</span>  
          </Link>
        </CustomToolTip>
        <CustomToolTip title={'Discover'} pos='left' >
          <Link to={'/discover'} className={`w-fit lg:w-full p-[10px] ${location === '/discover' ? 'bg-slate-200' : 'bg-white'} hover:bg-slate-300 rounded-md cursor-pointer stroke-1 flex items-center gap-2 text-md font-semibold  mb-1`}>
            {location === '/discover' ? 
              <AiFillCompass size={25}/> :
              <AiOutlineCompass size={25}/>
            }
            <span className='sm:hidden lg:block'>Discover</span> 
          </Link> 
        </CustomToolTip>
        <CustomToolTip title={'Create'} pos='left'>
          <button className='w-fit lg:w-full p-[10px] hover:bg-slate-300 rounded-md cursor-pointer flex items-center gap-2 font-semibold' onClick={()=>setCreatePostModal(!createPostModal)}>
            <GrAddCircle size={25} strokeWidth={3}/> 
            <span className='sm:hidden lg:block'>Create</span>
          </button>
        </CustomToolTip> 
    </div>
  )
}

export default memo(Sidebar)