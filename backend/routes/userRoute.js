import express from "express";
import authUser from '../middlewares/authUser.js'
import {
  getProfile,
  loginUser,
  registerUser,
  UpdatProfile, bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay
} from "../controllers/userController.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/update-profile", upload.single('image'),authUser, UpdatProfile);
userRouter.post("/book-appointment",authUser, bookAppointment);
userRouter.get("/appointment",authUser, listAppointment);
userRouter.post("/cancel-appointment",authUser, cancelAppointment);
userRouter.post("/payment-razoroay",authUser, paymentRazorpay);
userRouter.post("/verify-razoroay",authUser, verifyRazorpay);

export default userRouter;
