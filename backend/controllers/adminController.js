import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// API for admin doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;
    console.log(
      {
        name,
        email,
        password,
        speciality,
        degree,
        experience,
        about,
        fees,
        address,
      },
      imageFile
    );

    // checking fro all data to and doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ siccess: false, message: "Missing Details" });
    }
    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ siccess: false, message: "Please enter email" });
    }
    // validating strong password
    if (password.length < 8) {
      return res.json({
        siccess: false,
        message: "Please enter a storng password",
      });
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    console.log("imageUpload", imageUpload);

    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.log("addDoctor", error);
    res.json({ success: false, message: error.message });
  }
};

//API for Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRT);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    console.log("adminLogin", error);
    res.json({ success: false, message: error.message });
  }
};

// api to get all doctor list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log("allDoctors", error);
    res.json({ success: false, message: error.message });
  }
};

//API to get all apointment list
const appointmentAdmin = async (req, res) => {
  try {
    const appointment = await appointmentModel.find({});
    res.json({ success: true, appointment });
  } catch (error) {
    console.log("allDoctors", error);
    res.json({ success: false, message: error.message });
  }
};

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);
console.log(doctorData);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.log("cancelAppointment..", error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashbord data for admin panel
const adminDashbord = async (req,res) =>{
  try {
    const doctor = await doctorModel.find({})
    const users = await userModel.find({})
    const appointment = await appointmentModel.find({})
    
    const dashData = {
      doctor : doctor.length,
      patients : users.length,
      appointment: appointment.length,
      latestAppointment : appointment.reverse().slice(0,5)
    }
    res.json({success:true, dashData})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
  }
}
export { addDoctor, adminLogin, allDoctors, appointmentAdmin, appointmentCancel, adminDashbord };
