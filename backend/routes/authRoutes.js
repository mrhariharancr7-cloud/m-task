import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import {register, login, logout, forgotPassword, verifyOtp} from "../controllers/authController.js";

const router = express.Router();

//register
router.post("/register", register);

//login
router.post("/login", login);

//logout
router.post("/logout", authMiddleware, logout);

//forgotpassword
router.post("/forgot-password", forgotPassword);

// verify otp and password
router.post("/verify-otp", verifyOtp);

export default router;