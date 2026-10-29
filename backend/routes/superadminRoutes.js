import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import roleMiddleware from "../middleware/rolemiddleware.js";
import {getAllUsers, BlockorActive, deleteUser, changeRole} from "../controllers/superadminController.js";

const router = express.Router();

//get all users data
router.get("/users", authMiddleware, roleMiddleware("superadmin"), getAllUsers);

// block or active user
router.put("/users/:id/block", authMiddleware, roleMiddleware("superadmin"), BlockorActive);

//delete user
router.delete("/users/:id", authMiddleware, roleMiddleware("superadmin"), deleteUser);

//change role
router.put("/users/:id/role", authMiddleware, roleMiddleware("superadmin"), changeRole);


export default router;