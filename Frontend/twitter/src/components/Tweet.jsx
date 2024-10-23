import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { TWEET_API_END_POINT } from "../Utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh } from "../redux/tweetSlice";
import toast from "react-hot-toast";
import { timeSince } from "../Utils/constant";

//password database  w2azCaBb9IwOgxRO   m4BN9XUSTfCi9ar4

function Tweet({ tweet }) {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  //like and dislike handle
  const handleLikeDislike = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      console.log(res);

      dispatch(getRefresh());

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.responce.data.message);
    }
  };

  //delete tweet------
  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });

      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.responce.data.message);
    }
  };

  return (
    <div className="m-4 ">
      <div className="flex items-center">
        <div className="flex items-center">
          <Avatar src=".\src\assets\rahul.jpg" size="40" round={true} />
        </div>
        <div className="p-4 w-full">
          <div className="flex items-center ">
            <h1 className="font-bold ">{tweet?.userDetails[0]?.name}</h1>
            <p className="text-gray-500 text-sm ml-2">{`@${
              tweet?.userDetails[0]?.username
            } . ${timeSince(tweet?.createdAt)}`}</p>
          </div>
          <div>
            <p>{tweet?.description} </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between ml-14">
        <div className="flex items-center cursor-pointer">
          <div className="hover:bg-green-500 rounded-full p-2">
            <FaRegComment size={"24px"} />
          </div>
          <p className="ml-2"></p>
        </div>
        <div className="flex items-center cursor-pointer">
          <div
            onClick={() => handleLikeDislike(tweet?._id)}
            className="hover:bg-red-600 rounded-full p-2"
          >
            <CiHeart size={"26px"} />
          </div>
          <p className="ml-2">{tweet?.like?.length}</p>
        </div>
        <div className="flex items-center cursor-pointer">
          <div className="hover:bg-yellow-500 rounded-full p-2">
            <CiBookmark size={"24px"} />
          </div>
          <p className="ml-2">0</p>
        </div>
        {user?._id === tweet?.userId && (
          <div className="flex items-center cursor-pointer">
            <div
              onClick={() => deleteHandler(tweet?._id)}
              className="hover:bg-red-500 rounded-full p-2"
            >
              <MdOutlineDeleteOutline size={"24px"} />
            </div>
            <p className="ml-2"></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tweet;
