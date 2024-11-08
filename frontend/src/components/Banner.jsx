import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex bg-primary rounded-lg px-6 sm:px10 md:px-14 lg:px-8 my-20 md:mx-10">
      {/* ---- Left Side ---- */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-[25px] sm:text-[28px] md:text-[32px] lg:text-[38px] font-semibold text-white">
          <p>Book Appointment</p>
          <p className="mt-3">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {navigate("/login"); scrollTo(0, 0); }}
          className="bg-white text-sm sm:text-base text-gray-600 hover:scale-105 rounded-lg py-1 px-7 mt-4 transition-all"
        >
          Create account
        </button>
      </div>
      {/* ---- Right Side ---- */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={assets.appointment_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;