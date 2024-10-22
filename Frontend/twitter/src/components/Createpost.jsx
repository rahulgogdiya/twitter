import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import React, { useState } from "react";
import axios from "axios";
import { TWEET_API_END_POINT } from "../Utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets, getIsActive, getRefresh } from "../redux/tweetSlice";

function Createpost() {
  const [description, setDescription] = useState("");

  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);
  // console.log(isActive);
  

  const dispatch = useDispatch();

  const HandlePost = async () => {
    // console.log(description);

    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, id: user?._id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch(getRefresh());

      if (res.data.sucess) {
        toast.success(res.data.message);
      }
      setDescription("");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  //handleForYou handlefollowing-----------------
  const handleForYou = () => {
    dispatch(getIsActive(true));
  };
  const handleFollowing = () => {
    dispatch(getIsActive(false));
  };

  return (
    <div className="w-[100%]">
      <div className="flex items-center justify-evenly border-b border-gray-100  shadow-sm">
        <div
          onClick={handleForYou}
          className={`${
            isActive
              ? "border-b-4 border-blue-600"
              : "border-b-4 border-transparent"
          } cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-2`}
        >
          <h1 className="font-semibold text-gray-600 text-lg">Foy you</h1>
        </div>

        <div
          onClick={handleFollowing}
          className={`${
           !isActive
              ? "border-b-4 border-blue-600"
              : "border-b-4 border-transparent"
          }
          cursor-pointer  hover:bg-gray-200 w-full text-center  px-4 py-2`}
        >
          <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
        </div>
      </div>
      <div>
        <div className="m-4 flex items-center">
          <div>
            <Avatar src=".\src\assets\rahul.jpg" size="40" round={true} />
          </div>
          <input
            className="w-full outline-none text-lg ml-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="What is happening?!"
          />
        </div>

        {/* --------------------------------------------------------------------------- */}

        <div className="border-b border-gray-300 flex justify-between items-center p-4">
          <div>
            <CiImageOn size={"24px"} className="cursor-pointer" />
          </div>
          <button
            onClick={HandlePost}
            className="px-4 py-2 border-none rounded-full  text-white font-bold bg-[#1D9BF0]"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Createpost;
