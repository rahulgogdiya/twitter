import React from "react";
import Tweet from "./Tweet";
import { useSelector } from "react-redux";
import Createpost from "./Createpost";

function Feed() {
  const { tweets } = useSelector((store) => store.tweet);

  return (
    <div className="w-[50%] h-[90vh] border border-gray-100 shadow-lg">
      <div>
        <Createpost />

        {tweets?.map((tweet) => (
          <Tweet key={tweet?._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
