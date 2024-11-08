import React, { useContext } from "react";
import Login from "./page/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContect } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./page/admin/Dashboard";
import AllApointment from "./page/admin/AllApointment";
import DoctorList from "./page/admin/DoctorList";
import AddDoctor from "./page/admin/AddDoctor";
import { DoctorContect } from "./context/DoctorContext";
import DoctorDashbord from "./page/doctor/DoctorDashbord";
import DoctorAppointment from "./page/doctor/DoctorAppointment";
import DoctorProfile from "./page/doctor/DoctorProfile";

const App = () => {
  const { aToken } = useContext(AdminContect);
  const { dToken } = useContext(DoctorContect);

  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin route*/}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-apointment" element={<AllApointment />} />
          <Route path="/doctor-list" element={<DoctorList />} />
          <Route path="/add-doctor" element={<AddDoctor />} />

          {/* Doctor route*/}
          <Route path="/doctor-dashboard" element={<DoctorDashbord />} />
          <Route path="/doctor-appointment" element={<DoctorAppointment />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
