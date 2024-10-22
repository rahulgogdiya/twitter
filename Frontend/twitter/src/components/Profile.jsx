import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import useGetProfile from "../hooks/useGetProfile";
import { useDispatch, useSelector } from "react-redux"; //redux se koi value utha kr lane ke liye use
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlices";
import { getRefresh } from "../redux/tweetSlice";

function Profile() {
  const { user, profile } = useSelector((store) => store.user);
  const { id } = useParams();
  useGetProfile(id);

  const dispatch = useDispatch();

  //follow and unfollow
  const foloowAndUnfollowHandler = async () => {
    if (user.following.includes(id)) {
      //unfollow

      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {
          id: user?._id,
        });
        console.log(res);

        dispatch(followingUpdate(id));
        dispatch(getRefresh())

        toast.success(res.data.message);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } else {
      //follow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {
          id: user?._id,
        });
        console.log(res);

        dispatch(followingUpdate(id));
        dispatch(getRefresh())


        toast.success(res.data.message);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div className="flex items-center py-2">
        <Link
          to="/"
          className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
        >
          <IoMdArrowBack size={"24px"} />
        </Link>
        <div className="ml-2">
          <h1 className="font-bold text-lg">{profile?.name}</h1>
          <p className="text-gray-400  text-sm">10 post</p>
        </div>
      </div>
      <div>
        <img src="..\src\assets\img.jpg" alt="banner" className="photo" />
        <div className="absolute ml-4 rahul bg-white rounded-full border-4 cursor-pointer">
          <Avatar src="..\src\assets\rahul.jpg" size="100" round={true} />
        </div>
      </div>

      <div className="text-right mt-4 cursor-pointer ">
        {profile?._id === user?._id ? (
          <button className="border hover:bg-slate-200 border-gray-400 px-4 py-1 rounded-full">
            Edit Profile
          </button>
        ) : (
          <button
            onClick={foloowAndUnfollowHandler}
            className="border text-white font-sm bg-[#1D9BF0] hover:bg-blue-500 border-blue-500 px-4 py-1 rounded-full"
          >
            {user.following.includes(id) ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>

      <div className="m-4">
        <h1 className="font-bold text-xl">{profile?.name}</h1>
        <p>@{profile?.username}</p>
      </div>

      <div className="m-4 text-sm">
        <p>
          Lorem ipsum dolor sit amet consecam id ab sequi officiis illo cons ad
          obcaecati voluptates deleniti harum perspiciatis a neque mollitia?
          Officia.
        </p>
      </div>
    </div>
  );
}

export default Profile;
