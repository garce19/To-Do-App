import { TaskStatus } from '../constants/taskStatus.js';
import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: `No task with id : ${id}` });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTasksByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const tasks = await Task.find({ status });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTasksByPriority = async (req, res) => {
    try {
        const { priority } = req.params;
        const tasks = await Task.find({ priority });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTasksByCompletion = async (req, res) => {
    try {
        const { completed } = req.params;
        const tasks = await Task.find({ completed });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTasksByDate = async (req, res) => {
    try {
        const { dueDate } = req.query;
        const parsedDueDate = parseSimpleDate(dueDate);
        if (!parsedDueDate) {
            return res.status(400).json({ message: "Invalid due date. Use format YYYY-MM-DD" });
        }
        const tasks = await Task.find({ dueDate: parsedDueDate });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTasksByCreationDate = async (req, res) => {
    try {
        const { createdAt } = req.query;
        const parsedCreatedAt = parseSimpleDate(createdAt);
        if (!parsedCreatedAt) {
            return res.status(400).json({ message: "Invalid creation date. Use format YYYY-MM-DD" });
        }
        const tasks = await Task.find({ createdAt: parsedCreatedAt });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTasksInDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const tasks = await Task.find({
            dueDate: {
                $gte: startDate,
                $lte: endDate,
            },
        });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
        const { dueDate, ...rest } = req.body;
        let parsedDueDate;

        if (dueDate) {
            parsedDueDate = parseSimpleDate(dueDate);
            if (!parsedDueDate) {
                return res.status(400).json({ message: "Invalid due date. Use format YYYY-MM-DD" });
            }
        }

        const newTask = new Task({ dueDate: parsedDueDate, ...rest });
        const savedTask = await newTask.save();
        res.status(201).json({ savedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        
        const task = Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: `No task with id : ${id}` });
        }

        if (req.body.dueDate) {
            const parsedDueDate = parseSimpleDate(req.body.dueDate);
            if (!parsedDueDate) {
                return res.status(400).json({ message: "Invalid due date. Use format YYYY-MM-DD" });
            }
            req.body.dueDate = parsedDueDate;
        }

        if (req.body.title !== undefined) task.title = req.body.title;
        if (req.body.description !== undefined) task.description = req.body.description;
        if (req.body.status !== undefined) task.status = req.body.status;
        if (req.body.dueDate !== undefined) task.dueDate = req.body.dueDate;
        if (req.body.completed !== undefined) task.completed = req.body.completed;
        if (req.body.priority !== undefined) task.priority = req.body.priority;

        const updatedTask = await task.save();
        res.status(200).json({ updatedTask });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: `No task with id : ${id}` });
        }
        await task.remove();
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const markTaskAsCompleted = async (req, res) => {
    try {
        const { id } = req.params;
        const task = Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: `No task with id : ${id}` });
        }
        task.completed = true;
        task.status = TaskStatus.INACTIVE;
        const updatedTask = await task.save();
        res.status(200).json({ updatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const parseSimpleDate = (dateStr) => {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return null;
    
    const [year, month, day] = parts.map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
    
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? null : date;
  };