import React from "react";
import { FiHome } from "react-icons/fi";
import { FaHashtag } from "react-icons/fa6";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoBookmarks } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant";
import toast from 'react-hot-toast'
import { getMyProfile, getOtherUser, getUser } from "../redux/userSlices";


function Leftsidebar() {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      toast.success(res.data.message);
      dispatch(getUser(null))
      dispatch(getOtherUser(null))
      dispatch(getMyProfile(null))
      navigate('./login')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[20%]">
      <div>
        <div className="ml-4">
          <img width={"24px"} src="./src/assets/logo.png" alt="" />
        </div>
        <Link
          to="/"
          className="flex items-center my-2 py-2 cursor-pointer hover:bg-gray-200 rounded-full p-4 mt-4"
        >
          <div className="">
            <FiHome size={"24px"} />
          </div>
          <h1 className="font-medium text-lg ml-2">Home</h1>
        </Link>
        <div className="flex items-center my-2 py-2 cursor-pointer hover:bg-gray-200 rounded-full p-4 ">
          <div className="">
            <FaHashtag size={"24px"} />
          </div>
          <h1 className="font-medium text-lg ml-2">Explore</h1>
        </div>
        <div className="flex items-center my-2 py-2 cursor-pointer hover:bg-gray-200 rounded-full p-4 ">
          <div className="">
            <IoNotificationsCircleSharp size={"24px"} />
          </div>
          <h1 className="font-medium text-lg ml-2">Notification</h1>
        </div>
        <Link
          to={`/profile/${user?._id}`}
          className="flex items-center my-2 py-2 cursor-pointer hover:bg-gray-200 rounded-full p-4 "
        >
          <div className="">
            <CgProfile size={"24px"} />
          </div>
          <h1 className="font-medium text-lg ml-2">Profile</h1>
        </Link>
        <div className="flex items-center my-2 py-2 cursor-pointer hover:bg-gray-200 rounded-full p-4 ">
          <div className="">
            <IoBookmarks size={"24px"} />
          </div>
          <h1 className="font-medium text-lg ml-2">Bookmarks</h1>
        </div>
        <div
          onClick={logOutHandler}
          className="flex items-center my-2 py-2 cursor-pointer hover:bg-gray-200 rounded-full p-4 "
        >
          <div className="">
            <IoLogOut size={"24px"} />
          </div>
          <h1 className="font-medium text-lg ml-2">Logout</h1>
        </div>
        <button className="px-4 py-2 border-none rounded-full w-full text-white font-bold bg-[#1D9BF0]">
          Post
        </button>
      </div>
    </div>
  );
}

export default Leftsidebar;
