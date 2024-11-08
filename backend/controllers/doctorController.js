import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// API for doctor  change availablity
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    const dacData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !dacData.available,
    });

    res.json({ success: true, message: "Available  Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for doctor list
const doctorsList = async (req, res) => {
  try {
    const doctrs = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctrs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRT);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor appointment fordoctor panel
const appointmentDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointment = await appointmentModel.find({ docId });

    res.json({ success: true, appointment });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to make appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to dashbord data for doctor panel
const doctorDashbord = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointment = await appointmentModel.find({ docId });

    let earnings = 0;

    appointment.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointment.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointment: appointment.length,
      patients: patients.length,
      latestAppointment: appointment.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log("doctorDashbord...", error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor profile
const doctorProfile = async (req, res) =>{
  try {
    const {docId} = req.body
    const profileData = await doctorModel.findById(docId).select("-password")
    res.json({success:true,profileData})
  } catch (error) {
    console.log("doctorProfile...", error);
    res.json({ success: false, message: error.message });
  }
}

// API to update doctor profile from doctor panel
const updateDoctorProfile = async (req, res) => {
  try {
    const {docId, fees, address, available} = req.body
    await doctorModel.findByIdAndUpdate(docId, {fees, address, available})

    res.json({success:true,message: "Doctor Profile updated"})
  } catch (error) {
    console.log("doctorProfile...", error);
    res.json({ success: false, message: error.message });
  }
}
export {
  changeAvailablity,
  doctorsList,
  loginDoctor,
  appointmentDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashbord,
  doctorProfile,
  updateDoctorProfile
};
