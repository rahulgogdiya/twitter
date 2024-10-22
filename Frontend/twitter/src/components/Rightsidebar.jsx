import React from "react";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
// import Link

function Rightsidebar({ otherUsers }) {
  return (
    <div className="w-[25%]">
      <div className=" flex items-center p-2 bg-gray-100 rounded-full ">
        <CiSearch size={"24px"} />
        <input className="outline-none px-2 bg-transparent" type="text" />
      </div>

      <div className="mt-4 bg-slate-100 rounded-xl p-4">
        <h1>Who is follow</h1>

        {otherUsers?.map((user) => {
          return (
            <div
              key={user?._id}
              className="mt-4 flex items-center justify-between "
            >
              <div className=" flex cursor-pointer">
                <div>
                  <Avatar src=".\src\assets\rahul.jpg" size="40" round={true} />
                </div>
                <div className="ml-1">
                  <h1>{user?.name}</h1>
                  <p className="text-gray-400">@{user?.username}</p>
                </div>
              </div>
              <Link to={`/profile/${user?._id}`}>
                <button className="cursor-pointer px-4 py-1 border-none rounded-full  text-white font-sm bg-[#1D9BF0]">
                  Profile
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rightsidebar;
