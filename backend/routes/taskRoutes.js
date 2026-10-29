import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import{createTask,getTasks,updateTask,deleteTask} from "../controllers/taskController.js";

const router = express.Router();

//create task
router.post("/", authMiddleware, createTask);

//get tasks data
router.get("/", authMiddleware, getTasks);

//update task
router.put("/:id", authMiddleware, updateTask);

//delete task
router.delete("/:id", authMiddleware, deleteTask);

export default router;