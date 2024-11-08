import React, { useContext } from 'react'
import { AdminContect } from '../context/AdminContext'
import { assets } from '../assets/assets_admin/assets'
import { useNavigate } from 'react-router-dom'
import { DoctorContect } from '../context/DoctorContext'

const Navbar = () => {
    const {aToken, setAToken} = useContext(AdminContect)
    const {dToken, setDToken} = useContext(DoctorContect)

    const navigate = useNavigate()

    const logout = () =>{
        navigate('/')
        aToken && setAToken("")
        dToken && setDToken("")
        aToken && localStorage.removeItem('aToken')
        dToken && localStorage.removeItem('dToken')
    }
  return (
    <div className='flex justify-between items-center py-2 px-4 sm:px-10 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 drop-shadow-mdw-40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? "Admin" : "Doctor"}</p>
      </div>
      <button onClick={logout} className='bg-primary text-sm px-10 py-2 rounded-lg'>Logout</button>
    </div>
  )
}

export default Navbar
