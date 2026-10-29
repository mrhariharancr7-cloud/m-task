import User from "../models/User.js";


// get all users data
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            users
        });
    } catch (error) {
        console.error("Error fetching users:",error)

        res.status(500).json({
            message: "Failed to fetch users"
        });
    }
};

// block or active user 
export const BlockorActive = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.isBlocked = !user.isBlocked;
        await user.save();

        res.status(200).json({
            message: user.isBlocked
            ? "User blocked successfully"
            : "User activated successfully",
            user
        });

    } catch (error) {
        console.error("Error updating user status:", error);

        res.status(500).json({
            message: "Failed to update user status"
        });
    }
};

// delete user 
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "User deleted successfully"
        });
    }catch (error) {
        console.error("Error deleting user:", error);

        res.status(500).json({
            message: "Failed to delete user"
        });
    }
};

// change role of user
export const changeRole = async (req, res) => {
    try {
        const { role } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        user.role = role;
        await user.save();

        res.status(200).json({
            message: "User role updated successfully",
            user
        });
    } catch (error) {
        console.error("Error updating user role:", error);

        res.status(500).json({
            message: "Failed to update user role"
        });
    }

};