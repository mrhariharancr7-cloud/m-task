import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import roleMiddleware from "../middleware/rolemiddleware.js";
import {getSuperadminReports} from "../controllers/superadminReportController.js";

const router = express.Router();

//get report data
router.get("/reports", authMiddleware, roleMiddleware("superadmin"), getSuperadminReports);

export default router;