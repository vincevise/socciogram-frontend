import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
 
import { useDispatch, useSelector } from 'react-redux'
 
import { fetchUsers } from '../features/usersAllSlice'
import { selectUserDetails, userlogout } from '../features/currentUserSlice'
import { useDebounce } from '../hooks/useDebounce'
import { fetchSearchUsers, selectSearchUsers } from '../features/searchSlice'
import UserCard from './UserCard'
import UserCard1 from './UserCard1'
import { Oval } from 'react-loader-spinner'
 

const Navbar = () => {

    const [search, setSearch] = useState('')
    const [openSearchModal, setSearchModal] = useState(false)
    const [profileDropdown, setProfiledropdown] = useState(false)
    const debounceSearchTerm = useDebounce(search, 500)



    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const currentUserState = useSelector(selectUserDetails)

    const searchState = useSelector(selectSearchUsers)

    const profileDropDownRef = useRef(null)
    const searchModalRef = useRef(null)

    useEffect(()=>{
        if(search.trim()!==''){
            dispatch(fetchSearchUsers(debounceSearchTerm))
        }
    },[debounceSearchTerm])

     
    const handleChange = (e) => {
        setSearch(e.target.value)  
        setSearchModal(true) 
    }

    const loggedOut = () => {
        localStorage.removeItem('token')
        dispatch(userlogout()) 
    }

    useEffect(()=>{
        function handleClickOutside(event) {
            if (profileDropDownRef.current && !profileDropDownRef.current.contains(event.target)) { 
                if(profileDropdown){
                    setProfiledropdown(false)
                } 
            } 
            if (searchModalRef.current && !searchModalRef.current.contains(event.target)) { 
                if(searchModalRef){
                    setSearchModal(false)
                    
                } 
            }
          }
      
          document.addEventListener('mousedown', handleClickOutside);
      
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    },[profileDropdown, openSearchModal, search])

    const openProfileDropDown = () => { 
        setProfiledropdown(true)
    }

    // check if the user has logged in or not
    useEffect(()=>{
        if(!currentUserState.authenticated && !currentUserState.loading) navigate('/login')
    },[currentUserState])

    useEffect(()=>{
        setProfiledropdown(false)
        dispatch(fetchUsers())
    },[navigate])

  return (
    <>
        {profileDropdown && <div className='w-48 h-fit fixed bg-white top-[70px] right-[10px] rounded-md drop-shadow-lg p-2 text-slate-800 z-20 font-roboto' ref={profileDropDownRef}>
            <div className='flex gap-2'>
                <div className='w-12 h-12 bg-slate-200 rounded-full shrink-0 flex items-center justify-center font-semibold text-2xl overflow-hidden'>
                    { currentUserState.avatar.url==='' ?  
                        currentUserState.firstname[0]
                        :
                        <img src={currentUserState.avatar.url} alt="profile" className='w-full h-full object-cover' />
                    }
                </div>
                <div className='text-left'>
                    <p className='font-semibold camelcase'>{currentUserState.firstname} {currentUserState.lastname}</p>
                    <p className='text-sm '>@{currentUserState.username}</p>
                    
                </div>
            </div>
            <button className='border border-slate-300 hover:border-blue-300 w-full my-2 rounded-lg border-[2px] text-slate-500 text-sm' onClick={()=>navigate
            (`/profile/${currentUserState.username}`)}>View Profile</button>
            <hr />
            <button className='hover:underline text-sm text-left w-full' onClick={loggedOut}
            >Sign Out</button>
        </div>}

        {openSearchModal && <div className='w-96 min-h-48 h-48 max-h-fit fixed bg-white top-[70px] left-[10px] drop-shadow-md rounded-md z-30 p-2 overflow-y-scroll scrollable-div' ref={searchModalRef}>
                {searchState.loading 
                    ? 
                    <div className='w-full h-full flex items-center justify-center'>
                        <Oval/>
                    </div>
                    : 
                    <>
                        {searchState.users.map((x)=>{
                           return ( <UserCard1 data={x} key={x._id}/>)
                        })}
                    </>
                }
                
        </div>}
        
        <div className='bg-white h-[60px] border-b border-slate-400   max-w-screen w-full fixed flex items-center justify-between p-4 z-20'> 
            <span className='flex items-center gap-3'>
                <Link to={'/'} className='text-2xl font-handrawn'>SocioGram</Link>
                <input type="text" className='hidden sm:block border border-slate-300 rounded-md py-1 px-2 outline-blue-400' placeholder='Search' onChange={handleChange} value={search} />
            </span>
            <div className='flex items-center'>
                 
                <button onClick={openProfileDropDown} className='hidden sm:block  p-[10px]  rounded-md cursor-pointer stroke-1 ' >
                    <div className='w-[40px] h-[40px] bg-slate-400 rounded-full uppercase flex items-center justify-center text-xl font-semibold text-white text-center overflow-hidden'>
                        { currentUserState.avatar.url==='' ?  
                            currentUserState.firstname[0]
                            :
                            <img src={currentUserState.avatar.url} alt="profile" className='w-full h-full' style={{objectFit:'cover',width:'100%', height:'100%'}}/>
                        }
                    </div>    
                </button> 
            </div>
        </div>
        <div className='h-[60px] w-full'>  
        </div>
    </>
  )
}

export default memo(Navbar)