import jwt from "jsonwebtoken";
import dotnav from "dotenv";

dotnav.config({
  path: "../config/.env",
});

//agar user login ho tb hi tweet kr sakta h
const isAuthenticated = async (req, res, next) => {
  try {
    const  token  = req.cookies.token;
    console.log(token);

    //token nhi milta h to
    if (!token) {
      return res.status(401).json({
        message: "user not authenticated",
        sucess: false,
      });
    }

    //token  milta jata h  to
    const decode = await jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decode);
    req.user = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;
