import React, { useEffect, useRef, useState } from 'react'
import { selectUserDetails } from '../features/currentUserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { camelize } from '../helper/helper';
import { BsThreeDots } from "react-icons/bs";
import { deleteCommentThunk, editCommentThunk } from '../features/postsSlice';

const CommentCard = ({data}) => {
    const [openCommentDropDown, setCommentDropDown] = useState(false);
    const currentUserState = useSelector(selectUserDetails);
    const [comment, setComment] = useState('')
    const [editComment, setEditComment] = useState(true)
    
    const dropdownRef = useRef()
    const dispatch = useDispatch()

    const handleDeleteComment = () => {
        dispatch(deleteCommentThunk({comment: data._id, post:  data.post}))
    }

    const handleEditComment = async() => {
        const response = await dispatch(editCommentThunk({comment, id:data._id}))
        if(response.type === 'comments/editCommentThunk/fulfilled'){
            console.log('ass')
            setEditComment(true)
        }
    }

    useEffect(()=>{
        setComment(data.text)
    },[editComment])

    useEffect(()=>{
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) { 
                if(openCommentDropDown){
                    setCommentDropDown(false)
                } 
            }  
          } 
          document.addEventListener('mousedown', handleClickOutside);
      
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    },[openCommentDropDown])

    const handleChange = (e) =>{
        setComment(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    if(data){

        return (
          <div className="w-full flex gap-4 my-3" key={data._id}>
            <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center shrink-0 overflow-hidden">
                {data.user?.avatar.url === "" ? (
                <div className="flex items-center uppercase font-semibold">
                    {data.user.username[0]}
                </div>
                ) : (
                <img
                    src={data.user?.avatar.url}
                    className="w-full h-full object-cover"
                    alt=""
                />
                )}
            </div>
            <div className="w-full text-sm text-left bg-slate-100 p-2 rounded-md">
                <div className="font-semibold w-full flex justify-between items-center">
                { data.user?.firstname} {data.user?.lastname}
                {currentUserState._id === data.user._id && (
                    <div className="relative">
                    <span
                        className="cursor-pointer relative"
                        onClick={() =>
                        setCommentDropDown(!openCommentDropDown)
                        }
                    >
                        <BsThreeDots size={15} />
                    </span>
                    {openCommentDropDown && (
                        <div className="w-fit text-left py-1 px-2 rounded-md bg-white absolute top-3 left-0 drop-shadow-md font-medium		" ref={dropdownRef}>
                            <span className="block w-full text-red-600 cursor-pointer" onClick={handleDeleteComment}>Delete</span>
                            <span className="text-blue-600 cursor-pointer w-full" onClick={()=>{setEditComment(!editComment);setCommentDropDown(false)}}>Edit</span>
                        </div>
                    )}
                    </div>
                )}
                </div>
                <textarea style={{resize:"none"}} type="text" className='w-full bg-white disabled:bg-transparent outline-none px-1' rows={1} disabled={editComment} value={comment
                } onChange={(e)=>handleChange(e)} /> 
                {!editComment && 
                <div className='float-right'>
                    <button className='text-slate-500 font-semibold pointer-cursor ml-auto mr-0  mr-2' onClick={()=>setEditComment(true)}>Cancel</button>
                    <button className='text-blue-600 font-semibold pointer-cursor ml-auto mr-0 	 mr-2' onClick={handleEditComment}>Post</button>
                </div>
                }
            </div>
        </div>
        )
    }
}

export default CommentCard