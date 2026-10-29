import User from "../models/User.js";
import bcrypt from "bcrypt";

// get user profile data
export const getProfile = async (req, res) => {

    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        });
    }

    res.status(200).json({
        message: "you are authorized",
        user: user
    });

};

// update name and password profile settings
export const updateProfile = async (req, res) => {
    const { name, currentPassword, newPassword, startOfWeek, showImportant, showCompleted} = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    // update-username
    if (name) {
        user.name = name;
    }

    // updatestartoftheweek
    if (startOfWeek) {
        user.startOfWeek = startOfWeek;
    }

    // update smartlists
    if (showImportant !== undefined) {
        user.showImportant = showImportant;
    }

    if (showCompleted !== undefined) {
        user.showCompleted = showCompleted;
    }

    //updatepassword
    if (newPassword) {

        if (!currentPassword) {
            return res.status(400).json({
                message: "Current password is required"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Current password is wrong"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

     res.status(200).json({
        message: "Profile updated successfully"
     });
};