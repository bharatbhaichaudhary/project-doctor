import React, { useContext, useEffect, useState } from "react";
import { DoctorContect } from "../../context/DoctorContext";
import { AppContect } from "../../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { profileData, getProfileData, dToken, setProfileData,backendUrl } =
    useContext(DoctorContect);
  // console.log(profileData);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () =>{
    try {
      const updateData = {
        address:profileData.address,
        fees:profileData.fees,
        available:profileData.available
      }
      const {data} = await axios.post(backendUrl + '/api/doctor/update-profile',updateData,{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }else{
        toast.error(sata.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);
  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary/80 sm:max-w-60 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* --- doctor info : name, degry, exp.. --- */}

            <p className="flex items-center gap-2 text-3xl font-medium text-gray-800">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className=" px-2 border text-sm rounded-full">
                {profileData.experience}
              </button>
            </div>

            {/* --- doctor about --- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointmet Fees:{" "}
              <span className="text-gray-800">
                ₹
                {isEdit ? (
                  <input
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fres: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                    type="number"
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address.line1}
                  />
                ) : (
                  profileData.address.line1
                )}{" "}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address.line2}
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>

            <div className="flex gap-1 pt-2">
              <input onChange={(e)=> isEdit && setProfileData(prev => ({...prev, available: !prev.available}))} checked={profileData.available} type="checkbox" />
              <label htmlFor="">Available</label>
            </div>

            {
              isEdit?
              <button
              onClick={updateProfile}
              className="px-5 py-1 border border-primary text-sm rounded-lg mt-5 hover:bg-primary hover:text-white transition-all"
            >
              Save
            </button> 
            :
            <button
              onClick={() => setIsEdit(true)}
              className="px-5 py-1 border border-primary text-sm rounded-lg mt-5 hover:bg-primary hover:text-white transition-all"
            >
              Edit
            </button>
            }

            
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
