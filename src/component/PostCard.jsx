import React from 'react'
import { selectUserDetails } from '../features/currentUserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikes, selectOneUser } from '../features/getOneUserSlice';
import { AiFillEdit, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { GoComment } from 'react-icons/go'
import {RxBookmark} from 'react-icons/rx'

const PostCard = ({data}) => {
    const oneUserState = useSelector(selectOneUser);
    const { user } = oneUserState;

    const dispatch = useDispatch()

    const currentUserState = useSelector(selectUserDetails);

    const handleLikePost = (id) => { 
        // dispatch(fetchLikes({postId: id, like:true}))
    }
    
    const handleDislikePost = (id) => {
        // dispatch(fetchLikes({postId: id, like:false}))
    }
  return (
    <div className="w-full lg:w-[450px] my-2 p-4 rounded-lg bg-white mx-auto" key={data._id}>
        <div className="flex items-center ">
            <div className="w-10 h-10 rounded-full flex items-center overflow-hidden">

            {
                data.user.avatar.url ==='' 
                ?
                <div className="flex items-center">
                    {data.user.username[0]}
                </div> 
                : 
                <img src={data.user.avatar.url} className="w-full h-full object-cover" alt="" />
            }
            
            </div>
            <span className="font-semibold mx-2 gap-1 flex text-lg">
                <span>{user.firstname}</span>
                <span>{user.lastname}</span>
            </span>
            <span className="text-slate-600">
                @{user.username}
            </span>
        </div>
        <p className="text-left text-slate-600 my-3 text-lg font-thin">
            {data.description}
        </p>
        {
            data.postImage 
                && 
                // <div className=" mb-2">

                //     <img src={data.postImage.url} alt="post-image" className="w-full h-full object-fit"/>
                // </div>
                <img src={data.postImage.url}  width="430" height="768" alt="post-image" className="postcard-image mb-2"/>
        }
        <div className="flex gap-10 items-center [&>span]:cursor-pointer">
            <span className="flex items-center gap-2">
                
                    {data.likes.some((z)=>z._id === currentUserState._id) 
                    ? 
                    <span className="p-[7px] hover:bg-slate-200 rounded-full" onClick={()=>handleDislikePost(data._id)}>
                        <AiFillHeart size={25} color="red"/> 
                    </span>
                    :
                    <span className="p-[7px] hover:bg-slate-200 rounded-full" onClick={()=>handleLikePost(data._id)}>                                        
                        <AiOutlineHeart size={25} />
                    </span>
                }

                
                {data.likes.length}
            </span>
            <span className="flex items-center gap-2">
                <span className="p-[8px] hover:bg-slate-200 rounded-full flex items-center">
                    <GoComment size={22}/>
                        
                </span>
                0
            </span>
            <span className="flex items-center gap-2 mr-0 ml-auto">
                <span className="p-[7px] hover:bg-slate-200 rounded-full flex items-center">
                    <RxBookmark size={22}/>
                </span> 
            </span>
        </div>
    </div>
  )
}

export default PostCard