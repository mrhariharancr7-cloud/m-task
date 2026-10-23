import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import {createCustomList, getCustomLists, renameCustomList, deleteCustomList} from "../controllers/customListController.js";

const router = express.Router();

// create list
router.post("/", authMiddleware, createCustomList);

// get list
router.get("/", authMiddleware, getCustomLists);

// rename list
router.put("/:id", authMiddleware, renameCustomList);

// delete list
router.delete("/:id", authMiddleware, deleteCustomList);

export default router;