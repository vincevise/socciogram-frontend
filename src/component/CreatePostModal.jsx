import React, { useContext, useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { RiImageFill } from 'react-icons/ri'
import { PostContext } from '../App'
import CustomToolTip from './CustomToolTip'
import { axiosInstance } from '../api/api'

const CreatePostModal = () => {

    const {createPostModal, setCreatePostModal} = useContext(PostContext)

    const [image, setImage] = useState()
    const [text, setText] = useState()

    const handleModal = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setCreatePostModal(!createPostModal)
      }

    const handlePost = async() => {
      const formData = new FormData()
      formData.append("image", image)  
      formData.append("description", text)  

      const token = localStorage.getItem('token')
      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
              }
      };

      await axiosInstance.post('/posts/createPost', formData, config).then(()=>setCreatePostModal(false)) 
    }
  return (
    <>
      
      <div className='fixed top-0 bg-black/50 w-full h-full z-20 flex items-center justify-center' onClick={handleModal}>
          
      </div>
      <div className='w-11/12 lg:w-1/2 fixed  h-96 inset-0 m-auto bg-white   z-30 rounded-lg p-2 pl-4 overflow-y-scroll  scrollable-div flex flex-col'>
        <div className='flex w-full items-center '>
          <h1 className='font-semibold'>Create Post</h1>
         <button className=' p-2  ml-auto mr-0 rounded-full hover:bg-slate-100 active:bg-slate-200' onClick={handleModal}><GrClose size={20}/></button>
        </div>
        <div className='h-full w-full  mb-3 overflow-y-scroll scrollable-div'>
          <textarea className='w-full outline-0 p-2 mb-2' name="" id="" cols="30" rows="8" placeholder='What do you want to talk about ?' onChange={(e)=>setText(e.target.value)}></textarea>
          {typeof image === 'object' && <img src={URL.createObjectURL(image)} className='w-full   object-cover p-2' alt="" />}
        </div>
        <div className='flex justify-between w-full font-semibold bg-white items-center'>
            <CustomToolTip title='image' pos
            ='top'>
              <div>
                <label htmlFor="post-image">
                  <div className='rounded-full text-slate-500 p-2 hover:bg-slate-100 active:text-slate-800'><RiImageFill size={25}/></div>
                </label>
                <input type="file" className='hidden' id="post-image" accept="image/*" onChange={(e)=>setImage(e.target.files[0])}/>
              </div>
            </CustomToolTip>
          <button className='rounded-full bg-blue-600 px-4 py-1 text-white' onClick={handlePost}>Post</button>
         
        </div>
      </div>
      </>
  )
}

export default CreatePostModal