import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

//register 
export const register = async (req, res) => {
    const {name, email , password} = req.body;

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = new User({
        name:name,
        email:email,
        password: hashedpassword
    });

    await user.save();

    res.status(201).json({
        message: "User account registered sucessfully"
    });
};

//login
export const login = async (req, res) => {
    const {email,password} = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    if (user.isBlocked) {
        return res.status(403).json({
            message: "Your account is blocked"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Wrong password"
        });
    }

    const token = jwt.sign(
        { userId: user._id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn : "1h"}
    );

    res.status(200).json({
        message: "Login sucessful",
        token,
        role: user.role
    });
};

//logout
export const logout = async (req, res) => {
    try {

        res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {

        console.error("Error recording logout:", error);

        res.status(500).json({
            message: "Logout failed"
        });
    }
};

// forgotpassword and sending otp
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "Unregistered email"
        });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = await bcrypt.hash(otp, 10);
    user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    const emailResult = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: "M-Task Password Reset OTP",
        text: `Your M-Task password reset OTP is ${otp}. This OTP will expire in 10 minutes.`
    });

    res.status(200).json({
        message: "OTP sended successfully"
    });
};

//verifyotp and rest password   
export const verifyOtp = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "Unregistered email"
        });
    }

    if (!user.resetOtp || !user.resetOtpExpires) {
        return res.status(400).json({
            message: "OTP not found"
        });
    }

    if (new Date() > user.resetOtpExpires) {
        return res.status(400).json({
            message: "OTP has been expired"
        });
    }

    const isOtpCorrect = await bcrypt.compare(otp, user.resetOtp);

    if (!isOtpCorrect) {
        return res.status(400).json({
            message: "Invalid OTP"
        });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    user.resetOtp = null;
    user.resetOtpExpires = null;

    await user.save();

    res.status(200).json({
        message: "password reseted"
    });
};