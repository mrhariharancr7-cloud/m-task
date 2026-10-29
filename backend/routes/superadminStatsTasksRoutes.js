import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import roleMiddleware from "../middleware/rolemiddleware.js";
import{getAllTasks, getDashboardStats} from "../controllers/superadminStatsTasksController.js";

const router = express.Router();

//get all users tasks
router.get("/tasks", authMiddleware, roleMiddleware("superadmin"), getAllTasks);

//dashboard statistics
router.get("/stats", authMiddleware, roleMiddleware("superadmin"), getDashboardStats);


export default router;


