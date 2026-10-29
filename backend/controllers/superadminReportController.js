import User from "../models/User.js";
import Task from "../models/Task.js";

//get report data
export const getSuperadminReports = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        const tasks = await Task.find();

        const year = Number(req.query.year) || new Date().getFullYear();

        const registrationReport = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ].map((month, index)  => {

            const count = users.filter((user) => {

                if (!user.createdAt) {
                    return false;
                }

                const date = new Date(user.createdAt);

                return (
                    date.getFullYear() === year &&
                    date.getMonth() === index
                );

            }).length;

            return {
                name: month,
                value: count
            };
        });
    
        //userreport

        const totalUsers = users.length;

        const activeUsers = users.filter(
            (user) => !user.isBlocked
        ).length;

        const blockedUsers = users.filter(
            (user) => user.isBlocked
        ).length;

        const normalUsers = users.filter(
            (user) => user.role === "user"
        ).length;

        const superadmins = users.filter(
            (user) => user.role === "superadmin"
        ).length;

        //taskreport

        const totalTasks = tasks.length;

        const completedTasks = tasks.filter(
            (task) => task.completed
        ).length;

        const pendingTasks = tasks.filter(
            (task) => !task.completed
        ).length;

        const importantTasks = tasks.filter(
            (task) => task.important
        ).length;

        const overdueTasks = tasks.filter(
            (task) =>
                task.dueDate && !task.completed &&
                new Date(task.dueDate) < new Date()
        ).length;

        //user activity table
        const userActivity = users.map((user) => {

            const userTasks = tasks.filter(
                (task) =>
                    task.user.toString() === user._id.toString()
            );

            return {
                name: user.name,
                totalTasks: userTasks.length,

                completedTasks: userTasks.filter(
                    (task) => task.completed
                ).length,

                pendingTasks: userTasks.filter(
                    (task) => !task.completed
                ).length,

                importantTasks: userTasks.filter(
                    (task) => task.important
                ).length,

                accountStatus: user.isBlocked ? "Blocked" : "Active"
            };
        });

        res.status(200).json({

            userReport: {totalUsers,activeUsers,blockedUsers,normalUsers,superadmins},

            taskReport: {totalTasks,completedTasks,pendingTasks,importantTasks,overdueTasks},

            registrationReport,

            userActivity
        });

    } catch (error) {

        console.error("Error fetching reports:", error);

        res.status(500).json({
            message: "Failed to fetch reports"
        });
    }
};