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

dotenv.config();

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
        message: "user registered sucessfully"
    });
});

app.post("/api/login", async (req, res) => {
    const {email,password} = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: "Invaild email or password"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Invalid email or password"
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

app.post("/api/tasks", authMiddleware, async (req, res) => {
    const { title } = req.body;

    const task = new Task({
        title,
        user: req.user.userId
    });

    await task.save();

    res.status(201).json({
        message: "Task created Successfully",
        task
    });
});

app.get("/api/tasks", authMiddleware, async (req, res) => {
    const tasks = await Task.find({
        user:req.user.userId
    });

    res.status(200).json({
        tasks
    });
});

app.put("/api/tasks/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { title,completed } = req.body;

    const task = await Task.findOneAndUpdate(
        {
            _id: id,
            user: req.user.userId
        },
        {
            title,completed
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

