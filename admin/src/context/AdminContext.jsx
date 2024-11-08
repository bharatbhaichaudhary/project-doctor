import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContect = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");
  const [doctors, setDoctors] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [dashData, setDashDat] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctor = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("getAllDoctor", error);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctor();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getAppointment = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointment", {
        headers: { aToken },
      });
      console.log(data);

      if (data.success) {
        setAppointment(data.appointment);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashbord", {
        headers: { aToken },
      });

      if (data.success) {
        setDashDat(data.dashData);
      } else {
        console.log("adminDashbord", data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    getAllDoctor,
    doctors,
    changeAvailability,
    getAppointment,
    appointment,
    setAppointment,
    cancelAppointment,
    dashData,
    getDashData,
  };

  return (
    <AdminContect.Provider value={value}>
      {props.children}
    </AdminContect.Provider>
  );
};

export default AdminContextProvider;
