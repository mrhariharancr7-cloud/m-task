import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
import authMiddleware from "./middleware/authmiddleware.js";
import roleMiddleware from "./middleware/rolemiddleware.js";
import customListRoutes from "./routes/customListRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import profileSettRoutes from "./routes/profileSettRoutes.js";
import superadminStatsTasksRoutes from "./routes/superadminStatsTasksRoutes.js";
import superadminReportRoutes from "./routes/superadminReportRoutes.js";
import superadminRoutes from "./routes/superadminRoutes.js";
import superadminenquiryRoutes from "./routes/superadminenquiryRoutes.js";


dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.use("/api/profile", profileSettRoutes);

app.use("/api/custom-lists", customListRoutes);

app.use("/api/superadmin", superadminRoutes);

app.use("/api/superadmin", superadminStatsTasksRoutes);

app.use("/api/superadmin", superadminReportRoutes);

app.use("/api", superadminenquiryRoutes);

app.use("/api", authRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB is connected"))
    .catch((error) => console.log("MongoDB connection error:",error));



app.get("/", (req, res) => {
    res.send("M-Task backend is running");
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

