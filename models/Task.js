import mongoose from "mongoose";
import { TaskStatus } from "../constants/taskStatus.js";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        maxlength: [40, "Title cannot be more than 40 characters"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
        maxlength: [500, "Description cannot be more than 500 characters"],
    },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        default: TaskStatus.ACTIVE,
    },
    dueDate: {
        type: Date,
        required: [true, "Please provide a due date"],
        validate: {
            validator: function (value) {
                return value > Date.now();
            },
            message: "Due date must be in the future",
        }
    },
    completed: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: Number,
        required: [true, "Please provide a priority"],
        min: 1,
        max: 5,
    },
},
    { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);