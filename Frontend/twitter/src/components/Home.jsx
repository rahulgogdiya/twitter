import React, { useEffect } from "react";
import Rightsidebar from "../components/Rightsidebar";
import Leftsidebar from "../components/Leftsidebar";
import { Outlet, useNavigate } from "react-router-dom";
import useOtherUsers from "../hooks/useOtherUsers";
import { useSelector } from "react-redux";
import useGetTweet from "../hooks/useGetTweets";


function Home() {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[])
//use customeHooks
const {user,otherUsers} = useSelector(store=>store.user)
useOtherUsers(user?._id)
useGetTweet(user?._id)

  return (
    <div className="flex justify-between w-[90%] mx-auto mt-2">
      <Leftsidebar />
      <Outlet />
      <Rightsidebar otherUsers={otherUsers} />
    </div>
  );
}

export default Home;
