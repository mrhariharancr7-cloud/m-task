import mongoose from "mongoose";

const taskschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    completed: {
        type: Boolean,
        required: false,
    },

    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

});

const Task = mongoose.model("Task", taskschema);

export default Task;