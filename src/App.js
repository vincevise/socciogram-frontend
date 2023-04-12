import { createContext, useLayoutEffect, useState } from 'react' 
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar' 
import CreatePostModal from './component/CreatePostModal'
import BottomBar from './component/BottomBar'
import Login from './pages/Login'
import Register from './pages/Register' 
import { useDispatch, useSelector } from 'react-redux' 
import {  loginJWT } from './api/api'
import Home from './pages/Home' 
import { fetchUsers, selectAllUsers } from './features/usersAllSlice'
import UserDetails from './pages/UserDetails'
import Discover from './pages/Discover'
import { selectUserDetails, userAuth } from './features/currentUserSlice'
import Explore from './pages/Explore'
import { Oval } from 'react-loader-spinner'
import Loading from './pages/Loading'
 

 
export const PostContext = createContext()

function App() { 
  const [createPostModal, setCreatePostModal] = useState(false)

  const dispatch = useDispatch()
  const currentUser = useSelector(selectUserDetails)
  const usersStateAll = useSelector(selectAllUsers) 
 
  useLayoutEffect(()=>{
    if(localStorage.getItem('token')){
      const response = loginJWT().then((res)=>{dispatch(userAuth(res.data)) })
      dispatch(fetchUsers())
    }

  },[currentUser.username])
 

  console.log(currentUser)
 
  
  return ( 
    <> 
    <PostContext.Provider value={{createPostModal, setCreatePostModal}}>
    <div className='bg-slate-100 w-screen min-h-screen  	'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <> 
            {
              currentUser.loading ? 
              <Loading/> : 
              <>
                {
                  currentUser.authenticated  ? 
                  <>
                    <Navbar/>
                    <Sidebar/>
                    <Home/>
                    <BottomBar/>
                  </> 
                  :  
                  <Login/>
                }
              </>
            }
          </>
        }/>
        <Route path='/home' element={
          <> 
            <Navbar/>
            <Sidebar/>
            <Home/>
            <BottomBar/>
          </>
        }/>
         <Route path='/discover' element={
           <> 
            <Navbar/>
            <Sidebar/>
            <Discover/>
            <BottomBar/>
          </>
        }/>

        <Route path='/explore' element={
          <> 
            <Navbar/>
            <Sidebar/>
            <Explore/>
            <BottomBar/>
          </>
        }/> 
        <Route path='/login' element={
          <> 
            <Login/>
          </>
        }/>
        <Route path='/register' element={
          <> 
            <Register/>
          </>
        }/>
        <Route path='/discover' element={
          <>
            <Navbar/>
            <Sidebar/>
            <BottomBar/>
          </>
        }/> 
        <Route path='/profile/:id' element={
          <>
            <Navbar/> 
            <Sidebar/>
            <UserDetails/>
            <BottomBar/>
          </>
        }/>
        <Route path='/loading' element={<Loading/>}/>
          
      </Routes>
    </BrowserRouter>  
    </div>
    {
      createPostModal && 
      <CreatePostModal/>
    }
    
    </PostContext.Provider>
    </>
  )
}

export default App
