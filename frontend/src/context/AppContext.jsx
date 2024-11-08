import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false);
  const [userData, setUserData] = useState(false);

  const getDoctorData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      // console.log(data);

      if (data.success) {
        console.log(25,data);
        setDoctors(data.doctrs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("getDoctorData", error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () =>{
    try{
      const {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
      if(data.success){
        setUserData(data.userData)
      }else{
        toast.error(data.message);
      }
    }catch (error) {
      console.log("loadUserProfileData...", error);
      toast.error(error.message);
    }

  }

  const value = {
    doctors,
    token,
    setToken,
    backendUrl,
    setUserData,
    userData,
    loadUserProfileData,
    getDoctorData
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  useEffect(() => {
    if(token){
      loadUserProfileData()
    }else{
      setUserData(false)
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;