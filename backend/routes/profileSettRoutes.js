import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import { getProfile, updateProfile } from "../controllers/profileSettController.js";

const router = express.Router();

//get user profile data
router.get("/", authMiddleware, getProfile);

//update name and password settings
router.put("/", authMiddleware, updateProfile);

export default router;