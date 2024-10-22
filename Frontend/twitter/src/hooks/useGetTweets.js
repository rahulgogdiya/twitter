import axios from "axios";
import { TWEET_API_END_POINT } from "../Utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllTweets } from "../redux/tweetSlice";

//custom hooks

const useGetTweet = (id) => {
  const dispatch = useDispatch();
  //jab bhi tweet hoga to automaticly update ke liye
  const { refresh, isActive } = useSelector((store) => store.tweet);

  //following tweets
  const handleFollowing = async () => {
    try {
      const res = await axios.get(
        `${TWEET_API_END_POINT}/followingTweet/${id}`
      );
      // console.log(res);

      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchMyTweet = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`${TWEET_API_END_POINT}/getAllTweet/${id}`, {
        withCredentials: true,
      });
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isActive) {
      fetchMyTweet();
    } else {
      handleFollowing();
    }
  }, [refresh, isActive]);
};

export default useGetTweet;
