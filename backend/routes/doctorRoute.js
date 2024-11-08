import express from "express";
import { appointmentCancel, appointmentComplete, appointmentDoctor, doctorDashbord, doctorProfile, doctorsList, loginDoctor, updateDoctorProfile } from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";
const doctorRouter = express.Router()

doctorRouter.get('/list', doctorsList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments',authDoctor, appointmentDoctor)
doctorRouter.post('/complete-appointments',authDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointments',authDoctor, appointmentCancel)
doctorRouter.get('/dashboard',authDoctor, doctorDashbord)
doctorRouter.post("/update-profile",authDoctor, updateDoctorProfile);
doctorRouter.get("/profile",authDoctor, doctorProfile);

export default doctorRouter 