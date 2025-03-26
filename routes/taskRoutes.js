import express from 'express';
import { Router } from 'express';
import * as taskController from '../controllers/taskController.js';
const router = Router();

router.get('/', taskController.getTasks);
router.get("/status/:status", taskController.getTasksByStatus);
router.get("/:id", taskController.getTask);
router.get("/priority/:priority", taskController.getTasksByPriority);
router.get("/completed", taskController.getTasksByCompletion);
router.get("/date", taskController.getTasksByDate);
router.get("/date/:dueDate", taskController.getTasksByDate);
router.get("/date/:createdAt", taskController.getTasksByCreationDate);
router.post("/", taskController.createTask);
router.post("/date", taskController.getTasksInDateRange);
router.post("/:id/markComplete", taskController.markTaskAsCompleted);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;