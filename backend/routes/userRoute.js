import express from "express";
import isAuthenticated from "../config/auth.js";
import {
  bookmark,
  follow,
  getProfile,
  Login,
  Logout,
  otherUsers,
  Register,
  unFollow,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/Login").post(Login);
router.route("/Logout").get(Logout);
router.route("/bookmark/:id").put(isAuthenticated, bookmark);
router.route("/profile/:id").get(isAuthenticated, getProfile);
router.route("/otheruser/:id").get(isAuthenticated, otherUsers);
router.route("/follow/:id").post(isAuthenticated, follow);
router.route("/unfollow/:id").post(isAuthenticated, unFollow);
export default router;
