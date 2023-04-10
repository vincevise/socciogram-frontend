import React, { useEffect, useRef, useState } from "react";
import { selectUserDetails } from "../features/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectOneUser } from "../features/getOneUserSlice";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { RxBookmark } from "react-icons/rx";
import { fetchCommentPosts, fetchPostLikes, selectPosts } from "../features/postsSlice";
import { Link } from "react-router-dom";
import { axiosInstance } from "../api/api";
import { camelize } from "../helper/helper";
import'./PostCard.css'

import CommentCard from "./CommentCard";
import { Oval } from "react-loader-spinner";

const PostCard1 = ({ data }) => {
  const oneUserState = useSelector(selectOneUser);
  const { user } = oneUserState;
  const [openCommentSection, setCommentSection] = useState(false);
  const [comment, setComment] = useState(""); 

  const dispatch = useDispatch();
  const postRefBtn = useRef() 
  const loaderRef = useRef()

  const currentUserState = useSelector(selectUserDetails);

  const handleLikePost = (id) => {
    dispatch(fetchPostLikes({ postId: id, like: true }));
  };

  const handleDislikePost = (id) => {
    dispatch(fetchPostLikes({ postId: id, like: false }));
  };

  const handlePostComment = async () => {
    postRefBtn.current.style = 'display: none'
    loaderRef.current.style = 'display: block'
    const post = data._id;   
    const response = await dispatch(fetchCommentPosts({post, comment})) 
    setComment('')
    if(response.type === 'comments/fetchCommentPosts/fulfilled'){
      postRefBtn.current.style = 'display: block'
      loaderRef.current.style = 'display: none'

    }
  };

  const postState = useSelector(selectPosts)
    if(data.likes.length > 0){

      console.log(data.likes[0].username)
    }
  return (
    <div
      className="w-full lg:w-[450px] my-2 mb-4 p-4 pb-1 rounded-lg bg-white mx-auto"
      key={data._id}
    >
      <Link
        to={`/profile/${data.user.username}`}
        className="flex items-center "
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-slate-300">
          {data.user.avatar.url === "" ? (
            <div className="flex items-center uppercase font-semibold">
              {data.user.username[0]}
            </div>
          ) : (
            <img
              src={data.user.avatar.url}
              className="w-full h-full object-cover"
              alt=""
            />
          )}
        </div>
        <span className="font-semibold mx-2 gap-1 flex text-lg">
          <span>{data.user.firstname}</span>
          <span>{data.user.lastname}</span>
        </span>
        <span className="text-slate-600">@{data.user.username}</span>
      </Link>
      <p className="text-left text-slate-600 my-3 text-lg font-thin">
        {data.description}
      </p>
      {
        data.postImage && (
          <div className=" mb-2">
            <img
              src={data.postImage.url}
              alt="post-image"
              className="w-full h-full object-fit"
            />
          </div>
        ) 
      }
      <div className="flex gap-10 items-center [&>span]:cursor-pointer">
        <span className="flex items-center gap-2">
          {data.likes.some((z) => z._id === currentUserState._id) ? (
            <span
              className="p-[7px] hover:bg-slate-200 rounded-full"
              onClick={() => handleDislikePost(data._id)}
            >
              <AiFillHeart size={25} color="red" />
            </span>
          ) : (
            <span
              className="p-[7px] hover:bg-slate-200 rounded-full"
              onClick={() => handleLikePost(data._id)}
            >
              <AiOutlineHeart size={25} />
            </span>
          )}

          {data.likes.length}
        </span>
        <span className="flex items-center gap-2">
          <span
            className="p-[8px] hover:bg-slate-200 rounded-full flex items-center"
            onClick={() => setCommentSection(!openCommentSection)}
          >
            <GoComment size={22} />
          </span>
          {data.comments.length}
        </span>
        <span className="flex items-center gap-2 mr-0 ml-auto">
          <span className="p-[7px] hover:bg-slate-200 rounded-full flex items-center">
            <RxBookmark size={22} />
          </span>
        </span>
      </div>
      { data.likes.length > 0 && 
        <p className="text-left   m-2 text-gray-500 font-thin">Liked by {data.likes[0].username} {((data.likes.length - 1) > 1) ? `and ${data.likes.length - 1} others` : `and one other`}   </p>
      }
      {openCommentSection && (
        <>
            <div
                className={`w-full gap-4  mt-2 mb-4 h-fit flex   rounded-sm  relative items-center`}
            >
                <div className="w-10 h-10 bg-slate-200 rounded-full shrink-0 flex items-center justify-center font-semibold uppercase overflow-hidden">
                {currentUserState.avatar.url === "" ? (
                    currentUserState.firstname[0]
                ) : (
                    <img
                    src={currentUserState.avatar.url}
                    alt="profile"
                    className="w-full h-full object-cover"
                    />
                )}
                </div>
                <textarea
                    type="text"
                    id="post-comment"
                    className="py-1 px-4 w-full outline-blue-400 border-blue-100 rounded-full border-2 pr-20"
                    rows={1}
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                />
                <button
                    disabled={comment.length === 0}
                    className="text-blue-600 disabled:text-blue-300 my-auto  font-semibold absolute right-4"
                    onClick={handlePostComment}
                    ref={postRefBtn}
                >
                Post
                </button>

                <div className="my-auto  font-semibold absolute right-4 hidden" ref={loaderRef}>
                  <Oval
                      height={15}
                      width={15}
                      color="blue"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="white"
                      strokeWidth={4}
                      strokeWidthSecondary={2}
                  />
                </div>
            </div>
            
            <div className="">
                {data.comments.map((x) => {
                    return (
                         <CommentCard key={x._id} data={x}/>
                    );
                })}
            </div>
        </>
      )}
    </div>
  );
};

export default PostCard1;
