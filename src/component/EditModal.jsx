import axios from "axios";
import React, { memo, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { GrClose } from "react-icons/gr"; 
import { useDispatch } from "react-redux"; 
import { updateBioThunk, uploadPhotoThunk } from "../features/currentUserSlice";

const EditModal = ({ editModal, setEditModal, data }) => {

    const [profilePic, setProfilepic] = useState('')
    const [bio, setBio] = useState(data.bio) 

    const dispatch = useDispatch()

    const handleImageChange = (e) => {
        
        setProfilepic(e.target.files[0])
    }
    
    const handleSubmit = async() => {
        if(typeof profilePic === "object"){
            const formData = new FormData()
            formData.append("image", profilePic) 
            formData.append("caption",bio)

            console.log('upload photo')
            dispatch(uploadPhotoThunk(formData))
        }

        if(bio.length !== data.bio){
            dispatch(updateBioThunk(bio))
            console.log(bio)
        }
        window.location.reload();
    } 
    return (
        <div className="w-1/2 bg-white h-fit fixed inset-0 m-auto z-30 rounded-lg">
            <div className="w-1/2 fixed  text-[18px] border-b border-slate-300 flex items-center justify-between px-3 py-2 bg-white rounded-t-md">
                <span className="w-full text-center text-xl font-semibold">
                Edit Profile
                </span>
                <button
                className="right-1 top-1"
                onClick={() => setEditModal(!editModal)}>
                    <GrClose />
                </button>
            </div> 
            <div className="w-full  h-84 px-4 overflow-y-auto scrollable-div mt-12">
                <h1 className="text-left font-semibold py-2">Profile Picture</h1>
                <div className="w-full flex justify-center">
                    <label htmlFor="my-input">
                        <div className="relative group">
                            <div className="w-36 h-36 bg-slate-300 group-hover:opacity-50 transition duration-300 rounded-full text-6xl flex items-center justify-center">
                                {profilePic === '' ? 
                                    <>
                                        {data.avatar.url===''
                                            ?
                                            data?.username[0].toUpperCase()
                                            :
                                            <img src={data.avatar.url} alt="profile" className="w-full h-full object-cover rounded-full"/>
                                        }
                                    </>
                                    :
                                    <img src={URL.createObjectURL(profilePic)} alt="" className="w-full h-full object-cover rounded-full" />
                                
                                }
                            </div>
                            <div className="opacity-0 group-hover:opacity-50 transition duration-300 w-36 h-36 bg-slate-400 rounded-full absolute top-0 flex items-center justify-center">
                                <AiFillCamera size={40}/>
                            </div>
                        </div>
                    </label>
                    <input id="my-input" type="file" className="hidden" onChange={handleImageChange} accept="image/*"/>
                </div>
                <h1 className="text-left font-semibold py-2">Bio</h1> 
                <textarea
                    onChange={(e)=>setBio(e.target.value)}
                    type="text"
                    value={bio}
                    className="border border-slate-300 w-full p-2"
                    rows="3"
                    cols="50"
                />  
            </div>
            <div className="w-full text-right mt-2">
                <button className="py-1 px-4 text-lg font-semibold mb-4 mr-4 bg-blue-500 rounded-full text-white hover:bg-blue-500 active:bg-blue-600" onClick={handleSubmit}>Save </button> 
            </div> 
        </div>
    );
};

export default memo(EditModal);
