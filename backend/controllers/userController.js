import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    //basic validation --> all fild honi chahiuye
    if (!name || !username || !email || !password) {
      return res.status(401).json({
        message: "All fields are require",
        success: false,
      });
    }

    //agar user phle se hi exist h to
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "User already exist.",
        success: false,
      });
    }

    //password ko hashed password karna
    const hashedPassword = await bcryptjs.hash(password, 16);

    //user ko create karna
    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created sucesssfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//--------------------------------------------------
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "All fields are require",
        success: false,
      });
    }

    //agar user nhi ho to
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User does not exist.",
        success: false,
      });
    }

    //agar password email not match
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorect email and password",
        success: false,
      });
    }

    //match ho jata h
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    //genrate cookie
    return res
      .status(201)
      .cookie("token", token, { expiresIn: "1d", httpOnly: true })
      .json({
        message: `Welcome back ${user.name}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

//Logout----------------------------------------
export const Logout = (req, res) => {
  return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
    message: "user logged out sucessfully",
    sucess: true,
  });
};

//bookmark
export const bookmark = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    const user = await User.findById(loggedInUserId);

    if (user.bookmark.includes(loggedInUserId)) {
      //remove bookmark
      await User.findByIdAndUpdate(loggedInUserId, {
        $pull: { bookmark: tweetId },
      });
      return res.status(200).json({
        message: "remove bookmark",
        sucess: true,
      });
    } else {
      // add bookmark
      await User.findByIdAndUpdate(loggedInUserId, {
        $push: { bookmark: tweetId },
      });
      return res.status(200).json({
        message: "bookmarked",
        sucess: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//getprofile
export const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
//other user sagustion
export const otherUsers = async (req, res) => {
  try {
    const { id } = req.params;
    //$ne ek method h jo ye check krta "not qualto loggedin user id"
    const otherUsers = await User.find({ _id: { $ne: id } }).select(
      "-password"
    );

    if (!otherUsers) {
      return res.status(401).json({
        message: "no users",
      });
    }
    return res.status(200).json({
      otherUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

//follow
export const follow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id; //rahul
    const userId = req.params.id; //gogdiya

    const loggedUser = await User.findById(loggedInUserId); //rahul
    const user = await User.findById(userId); //gogdiya

    if (!user.followers.includes(loggedInUserId)) {
      await user.updateOne({ $push: { followers: loggedInUserId } });
      await loggedUser.updateOne({ $push: { following: userId } });
    } else {
      return res.status(400).json({
        message: `user aulrady followres to ${user.name}`,
      });
    }
    return res.status(200).json({
      message: ` ${loggedUser.name} just follow to ${user.name}`,
      sucess: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//unfollow
export const unFollow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id; //rahul
    const userId = req.params.id; //gogdiya

    const loggedUser = await User.findById(loggedInUserId); //rahul
    const user = await User.findById(userId); //gogdiya

    if (loggedUser.following.includes(userId)) {
      await user.updateOne({ $pull: { followers: loggedInUserId } });
      await loggedUser.updateOne({ $pull: { following: userId } });
    } else {
      return res.status(400).json({
        message: `unfollow`,
      });
    }
    return res.status(200).json({
      message: ` ${loggedUser.name} just unfollow to ${user.name}`,
      sucess: true,
    });
  } catch (error) {
    console.log(error);
  }
};
