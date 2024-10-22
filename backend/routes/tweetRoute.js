import express from "express";
import {getAllTweets, 
  createTweet,
  deleteTweet,
  likeDislike,
  getFollowingTweets,
} from "../controllers/tweetCntroller.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createTweet);
router.route("/delete/:id").delete(isAuthenticated, deleteTweet);
router.route("/like/:id").put(isAuthenticated, likeDislike);
router.route("/getAllTweet/:id").get(isAuthenticated, getAllTweets);
router.route("/followingTweet/:id").get(isAuthenticated, getFollowingTweets);

export default router;
