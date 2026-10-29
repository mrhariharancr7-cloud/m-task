import User from "../models/User.js";
import Task from "../models/Task.js";


// get all users tasks
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate("user", "name email");

        res.status(200).json({
            tasks
        });
    } catch (error) {

        console.error("Error fetching tasks:", error);

        res.status(500).json({
            message: "Failed to fetch tasks"
        });
    }
};

// superadmin statistics
export const getDashboardStats = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();

        const totalTasks = await Task.countDocuments();

        const completedTasks = await Task.countDocuments({completed: true});

        const pendingTasks = await Task.countDocuments({completed: false});

        const importantTasks = await Task.countDocuments({important: true});

        const overdueTasks = await Task.countDocuments({completed: false, dueDate: {$lt: new Date()}});

        res.status(200).json({
            totalUsers,totalTasks,completedTasks,pendingTasks,importantTasks,overdueTasks
        });

    } catch (error) {

        console.error("Error fetching statistics:", error);

        res.status(500).json({
            message: "Failed to fetch statistics"
        });
    }
};