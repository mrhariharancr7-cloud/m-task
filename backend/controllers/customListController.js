import CustomList from "../models/CustomList.js";
import Task from "../models/Task.js";
import mongoose from "mongoose";


// create List
export const createCustomList = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Custom list name is required"
            });
        }

        const trimmedName = name.trim();

        const existingList = await CustomList.findOne({
            user: req.user.userId,
            nameKey: trimmedName.toLowerCase(),
        });

        if (existingList) {
            return res.status(409).json({
                message: "A list with this name already exists",
            });
        }

        const customList = await CustomList.create({
            name: trimmedName,
            nameKey: trimmedName.toLowerCase(),
            user: req.user.userId,
        });

        return res.status(201).json({
            message: "Custom list created successfully",
            customList,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "A list with this name already exists",
            });
        }

        console.error("Error creating custom list:", error);

        return res.status(500).json({
            message: "Failed to create custom list",
        });
    }
};

// get all list belong to login user
export const getCustomLists = async (req, res) => {
    try {
        const customLists = await CustomList.find({
            user: req.user.userId,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            customLists,
        });
    } catch (error) {
        console.error("Error fetching custom lists:", error);

        return res.status(500).json({
            message: "Failed to fetch custom lists",
        });
    }
};

//rename list
export const renameCustomList = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Custom list name is required",
            });
        }

        const newName = name.trim();

        const customList = await CustomList.findOne({
            _id: id,
            user: req.user.userId,
        });

        if (!customList) {
            return res.status(404).json({
                message: "Custom list not found",
            });
        }

        const existingList = await CustomList.findOne({
            user: req.user.userId,
            nameKey: newName.toLowerCase(),
            _id: { $ne: id },
        });

        if (existingList) {
            return res.status(409).json({
                message: "A list with this name already exists",
            });
        }

        const oldName = customList.name;

        if (oldName.toLowerCase() !== newName.toLowerCase()) {
            customList.name = newName;
            customList.nameKey = newName.toLowerCase();

            await customList.save();

            await Task.updateMany(
                {user: req.user.userId,list: oldName}, {$set: { list: newName }}
            );
        } else if (oldName !== newName) {
            customList.name = newName;
            customList.nameKey = newName.toLowerCase();

            await customList.save();
        }

        return res.status(200).json({
            message: "Custom list renamed successfully",
            customList,
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "A list with this name already exists",
            });
        }

        console.error("Error renaming custom list:", error);

        return res.status(500).json({
            message: "Failed to rename custom list",
        });
    }
};

//delete list
export const deleteCustomList = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid custom list ID",
            });
        }

        const customList = await CustomList.findOne({
             _id: id,
             user: req.user.userId,
        });

        if (!customList) {
            return res.status(404).json({
                message: "Custom list not found",
            });
        }

        await Task.deleteMany({
            user: req.user.userId,
            list: customList.name,
        });

        await CustomList.deleteOne({
            _id: customList._id,
            user: req.user.userId,
        });

         return res.status(200).json({
            message: "Custom list and its tasks deleted successfully",
         });

    } catch (error) {
        console.error("Error deleting custom list:", error);

        return res.status(500).json({
            message: "Failed to delete custom list",
        });
    }
};