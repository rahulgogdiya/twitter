import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlices";
import { useEffect } from "react";

//custom hooks

const useGetProfile = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyProfilr = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
          withCredentials: true,
        });
        dispatch(getMyProfile(res.data.user));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyProfilr();
  }, [id]);
};

export default useGetProfile;
