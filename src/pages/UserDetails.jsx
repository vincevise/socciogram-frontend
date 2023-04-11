import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollower, fetchOneUser, removeFollower, selectOneUser } from "../features/getOneUserSlice";
import { useParams } from "react-router-dom";
import { camelize } from "../helper/helper";
import { GrClose } from "react-icons/gr";
import UserCard from "../component/UserCard";
import { Oval } from "react-loader-spinner";
import { AiFillEdit } from "react-icons/ai";
import EditModal from "../component/EditModal";
import {
  addfollowerThunk,
  removeFollowerThunk,
  selectUserDetails,
} from "../features/currentUserSlice";


import PostCard from "../component/PostCard";
import { fetchPostUsers, selectPosts } from "../features/postsSlice";
import Posts from "../component/Posts";
import Loader from "../component/Loader";

const UserDetails = () => {
  const dispatch = useDispatch();
  const oneUserState = useSelector(selectOneUser);
  const { user } = oneUserState;

  const [editModal, setEditModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("following");

  const currentUserState = useSelector(selectUserDetails);

  const postsState = useSelector(selectPosts)

  console.log(currentUserState, 'currentUser UserDetails')
  console.log(oneUserState, 'oneUser UserDetails')

  const params = useParams(); 

  useEffect(() => {
    dispatch(fetchOneUser(params.id));
    dispatch(fetchPostUsers(params.id))
  }, [params.id]);

  useEffect(() => {
    setOpenModal(false);
  }, [user.username]);

  const handleModal = (action) => {
    setOpenModal(true);
    setModalContent(action);
  };

  const handleFollow = async(newFollowerId) => {
  
    const response = await dispatch(addfollowerThunk(newFollowerId));

    if(response.type = "user/addFollower/fulfilled"){
      dispatch(addFollower(currentUserState))
    } 
  };

  const removeFollowing = async(userIdToRemove) => {
    const response = await dispatch(removeFollowerThunk(userIdToRemove));
    if(response.type = "user/removeFollower/fulfilled"){
      dispatch(removeFollower(currentUserState))
    } 
  };

 

  if (oneUserState.loading  ) {
    return (
      <Loader/>
    );
  }
 
  return (
    <>
        <div className="w-10/12 sm:w-7/12 mx-auto font-roboto">
            <div className="w-full	 mt-[10px] bg-white p-4 flex flex-col items-center justify-center rounded-md">
            <div className="w-36 h-36 bg-slate-600  rounded-full uppercase text-7xl text-white flex items-center justify-center overflow-hidden">
                {oneUserState.user.avatar &&
                oneUserState?.user?.avatar?.url === "" ? (
                oneUserState.user.firstname[0]
                ) : (
                <img
                    src={oneUserState?.user?.avatar?.url}
                    className="w-full h-full object-cover"
                />
                )}
            </div>
            <div className="mt-4">
                <h1 className="text-2xl font-semibold">
                {oneUserState.user?.firstname} {user?.lastname}
                </h1>
                <h1>@{user?.username}</h1>
                {user.bio?.length > 0 && (
                <p className="text-center text-sm my-2 px-2">{user.bio}</p>
                )}
            </div>
            <div>
                {oneUserState.user.username === currentUserState.username ? (
                <button
                    className="px-3 py-2 bg-slate-300 text-black rounded-md font-semibold text-md mt-4 flex items-center gap-2"
                    onClick={() => setEditModal(!editModal)}
                >
                    <AiFillEdit size={20} /> Edit Profile
                </button>
                ) : (
                <>
                    {currentUserState.following.includes(oneUserState.user._id) ? (
                    <button
                        className="px-2 py-1 bg-slate-300 text-black rounded-md font-semibold text-md mt-4"
                        onClick={() => removeFollowing(oneUserState.user._id)}
                    >
                        Unfollow
                    </button>
                    ) : (
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded-md font-semibold text-md mt-4"
                        onClick={() => handleFollow(oneUserState.user._id)}
                    >
                        Follow
                    </button>
                    )}
                </>
                )}
            </div>
            </div>
            <div className="w-full	lg:w-[450px] mx-auto mt-[10px] bg-white px-4   flex flex-col items-center justify-center rounded-md">
            <div className="flex justify-evenly lg:justify-center lg:gap-12 w-full [&>span]:py-2">
                <span className="[&>span]:block w-20 border-b-2 border-slate-900">
                <span className="">{user?.posts?.length} </span>
                <span className="font-semibold">posts</span>
                </span>
                <button
                className="[&>span]:block w-20 border-b-2 border-transparent	"
                onClick={() => handleModal("following")}
                >
                <span className="">{user?.following?.length} </span>
                <span className="font-semibold">following</span>
                </button>
                <button
                className="[&>span]:block w-20 border-b-2 border-transparent"
                onClick={() => handleModal("followers")}
                >
                <span className="">{user?.followers?.length} </span>
                <span className="font-semibold">followers</span>
                </button>
            </div>
            </div>
            {postsState.posts.length > 0 && (
            <div className="w-full mt-2 mb-10 rounded-lg mx-auto">
                <Posts/>
            </div>
            )}
        </div>
        {(openModal || editModal) && (
            <div
            className="fixed top-0 w-screen h-screen bg-black/50 z-20"
            onClick={() => {
                setOpenModal(false);
                setEditModal(false);
            }}
            ></div>
        )}
      {openModal && (
        <>
            <div className="rounded-md fixed inset-0 m-auto bg-white w-72 z-30 h-fit ">
                <div className="w-72 fixed  text-[18px] border-b border-slate-300 flex items-center justify-between px-3 py-2">
                <span className="w-full text-center bg-white">
                    {camelize(modalContent)}
                </span>
                <button
                    className="right-1 top-1"
                    onClick={() => setOpenModal(!openModal)}
                >
                    <GrClose />
                </button>
                </div>
                <div className="w-full   text-[18px] border-b border-slate-300 flex items-center justify-between px-3 py-2">
                <span>{camelize(modalContent)}</span>
                <button
                    className="right-1 top-1"
                    onClick={() => setOpenModal(!openModal)}
                >
                    <GrClose />
                </button>
                </div>
                <div className="w-full rounded-lg h-96 px-2 overflow-y-auto scrollable-div">
                {user[modalContent].map((x, i) => {
                    return <UserCard data={x} key={x._id} />;
                })}
                </div>
            </div>
        </>
      )}
      {editModal && (
        <EditModal
          editModal={editModal}
          setEditModal={setEditModal}
          data={user}
        />
      )}
    </>
  );
};

export default memo(UserDetails);
