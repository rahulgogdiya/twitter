import { Tweet } from "../models/twitSchema.js";
import { User } from "../models/userSchema.js";

//tweet create krna
export const createTweet = async (req, res) => {
  try {
    const { description, id } = req.body;
    if (!description || !id) {
      return res.status(401).json({
        message: "fields are require",
        sucess: false,
      });
    }


const user = await User.findById(id).select("-password")
    await Tweet.create({
      description,
      userId: id,
      userDetails:user
    });

    return res.status(201).json({
      message: "Tweet created successfully",
      sucess: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//tweet delete karna
export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);

    return res.status(200).json({
      message: "delete tweet",
      sucess: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//like dislike kon kr rha h
export const likeDislike = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);

    if (tweet.like.includes(loggedInUserId)) {
      //dislike
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUserId },
      });
      return res.status(200).json({
        message: "dislike tweet",
        sucess: true,
      });
    } else {
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
      });
      return res.status(200).json({
        message: "like tweet",
        sucess: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get alltweet
export const getAllTweets = async (req, res) => {
  //loggedin user ka tweet + following user ka tweet
  try {
    //loggedin user ka tweet
    const id = req.params.id;
    const loggedInUser = await User.findById(id);
    const loggedInUserTweets = await Tweet.find({ userId: id });

    // following user ka tweet
    const followingUserTweet = await Promise.all(
      loggedInUser.following.map((otherUserId) => {
        return Tweet.find({ userId: otherUserId });
      })
    );

    return res.status(200).json({
      tweets: loggedInUserTweets.concat(...followingUserTweet),
    });
  } catch (error) {
    console.log(error);
  }
};

//get following tweets
export const getFollowingTweets = async (req, res) => {
  try {
    //loggedin user ka tweet
    const id = req.params.id;
    const loggedInUser = await User.findById(id);

    // following user ka tweet
    const followingUserTweet = await Promise.all(
      loggedInUser.following.map((otherUserId) => {
        return Tweet.find({ userId: otherUserId });
      })
    );

    return res.status(200).json({
      tweets: [].concat(...followingUserTweet),
    });
  } catch (error) {
    console.log(error);
  }
};
