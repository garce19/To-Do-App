import mongoose from "mongoose";
import { TaskStatusEnum } from "../constants/TaskStatusEnum";

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
        enum: Object.values(TaskStatusEnum),
        default: TaskStatusEnum.ACTIVE,
    },
    timestamps: true
});

export default mongoose.model("Task", TaskSchema);