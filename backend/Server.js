import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import User from "./models/User.js";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import authMiddleware from "./middleware/authmiddleware.js";
import roleMiddleware from "./middleware/rolemiddleware.js";
import Task from "./models/Task.js";
import nodemailer from "nodemailer";

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

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB is connected"))
    .catch((error) => console.log("MongoDB connection error:",error));

app.get("/", (req, res) => {
    res.send("M-Task backend is running");
});

app.post("/api/register", async (req, res) => {
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
});

app.post("/api/login", async (req, res) => {
    const {email,password} = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
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
});

 {/*forgotpasswordandOTPsending*/}

app.post("/api/forgot-password", async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = await bcrypt.hash(otp, 10);
    user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: "M-Task Password Reset OTP",
        text: `Your M-Task password reset OTP is ${otp}. This OTP will expire in 10 minutes.`
    });

    res.status(200).json({
        message: "OTP sended successfully"
    });
});

{/*OTPverifyandrestpassword*/}

app.post("/api/verify-otp", async (req, res) => {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
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
});

app.get("/api/profile", authMiddleware, async (req, res) => {

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

});

{/*updateusernameandpassword-settings*/}

app.put("/api/profile", authMiddleware, async (req, res) => {
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
});

app.post("/api/tasks", authMiddleware, async (req, res) => {
    const { title, important, list, dueDate } = req.body;

    const task = new Task({
        title,
        important: important || false,
        list,
        dueDate,
        user: req.user.userId
    });

    await task.save();

    res.status(201).json({
        message: "Task created Successfully",
        task
    });
});

app.get("/api/tasks", authMiddleware, async (req, res) => {
    const { list, important, completed } = req.query;

    const filter = {
        user: req.user.userId
    };

    if (list) {
        filter.list = list;
    }

    if (important === "true") {
        filter.important = true;
    }

    if (completed === "true") {
        filter.completed = true;
    }

    const tasks = await Task.find(filter);

    res.status(200).json({
        tasks
    });
});

app.put("/api/tasks/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { title, completed, important, list, dueDate} = req.body;

    const task = await Task.findOneAndUpdate(
        {
            _id: id,
            user: req.user.userId
        },
        {
            title, completed , important, list, dueDate,
        },
        {new: true}
    );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json({
        message: "Task Updated Successfully",
        task
    });
});

app.delete("/api/tasks/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
        _id: id,
        user: req.user.userId
    });

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json({
        message: "Task deleted successfully"
    });
});

app.get("/api/admin", authMiddleware,roleMiddleware("admin"),(req, res) => {
    res.json({message: "welcom admin"});
});

app.get("/api/user", authMiddleware, roleMiddleware("user"), (req, res) => {
    res.json({ message: "welcome user" });
});

app.listen(5001, () => {
    console.log("sever started on port:5001");
});

