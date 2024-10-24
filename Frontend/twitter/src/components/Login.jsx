import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; //redairect home
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlices";

function Login() {
  const [islogin, setlogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const navigate = useNavigate(); //redairect home
  const dispatch = useDispatch();

  const loginSinupHandler = () => {
    setlogin(!islogin);
  };
  const handleForm = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, userName);

    if (islogin) {
      //login
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/Login`,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(getUser(res?.data?.user));
        // console.log(res);
        navigate("/");
        // console.log(res);
        if (res.data.success) {
          toast.success(res.data.message);
        }
      } catch (error) {
        // console.log(error);
        toast.success(error.response.data.message);
      }
    } else {
      //signup
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          {
            name,
            username,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log(res);
        // console.log(res);
        if (res.data.success) {
          setlogin(true); //redirect Login page
          toast.success(res.data.message);
        }
      } catch (error) {
        // console.log(error);
        toast.success(error.response.data.message);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-evenly">
      <div className="w-[]">
        <img src="./src\assets\logo.png" alt="logo" width={260} />
      </div>
      <div>
        <div>
          <h1 className="font-bold text-5xl">Happening Now</h1>
        </div>
        <h1 className="mt-4 mb-2 text-2xl">{islogin ? "Login.." : "Signup"}</h1>
        <form action="" onSubmit={handleForm} className="flex flex-col">
          {!islogin && (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="outline-blue-500 border border-gray-800 px-4 py-1 rounded-full my-1 font-semibold"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username"
                className="outline-blue-500 border border-gray-800 px-4 py-1 rounded-full my-1 font-semibold"
              />
            </>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="outline-blue-500 border border-gray-800 px-4 py-1 rounded-full my-1 font-semibold"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="outline-blue-500 border border-gray-800 px-4 py-1 rounded-full my-1 font-semibold"
          />
          <button className="px-4 py-2 mt-2 border-none rounded-full  text-white font-bold bg-[#1D9BF0]">
          {islogin ? "Login" : "Signup"}
          </button>
          <h1 className="mt-2">
            {islogin ? "Do have not an account" : " Already have a account"}
            <span
              onClick={loginSinupHandler}
              className="cursor-pointer font-bold text-blue-500"
            >
              {" "}
              {islogin ? "Signup" : "Login"}
            </span>
          </h1>
        </form>
      </div>
    </div>
  );
}

export default Login;
