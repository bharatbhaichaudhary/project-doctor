import React, { useContext, useEffect } from 'react'
import { DoctorContect } from '../../context/DoctorContext'
import { assets } from '../../assets/assets_admin/assets';
import { AppContect } from '../../context/AppContext';

const DoctorDashbord = () => {
  const {getDashData,  dashData, dToken, completedAppointment,cancelAppointment} = useContext(DoctorContect)
  const {slotDataFormat} = useContext(AppContect)
  console.log(dashData);
  
  useEffect(()=>{
    if(dToken){
      getDashData()
    }
  },[dToken])
  return dashData && (
    <div className='m-5'>
       <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                ₹ {dashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointment}
              </p>
              <p className="text-gray-400">Appointment</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Booking</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashData.latestAppointment.map((item, index) => (
              <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
                <img className="w-10 rounded-full" src={item.userData.image} alt="" />
                <div className="text-sm flex-1">
                  <p className="text-gary-800 font-medium">{item.userData.name}</p>
                  <p className="text-gray-600">{slotDataFormat(item.slotDate)}</p>
                </div>
                {
                item.
                cancelled
                ?<p className="text-red-500 text-xs font-medium">cancelled</p>
                :item.isCompleted
                ?<p className="text-green-500 text-xs font-medium">Completed</p>
                :<div className="flex gap-1">
                <img onClick={()=> cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="" />
                <img onClick={()=> completedAppointment(item._id)} className="w-10 cursor-pointer" src={assets.tick_icon} alt="" />
              </div>
              }
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default DoctorDashbord
