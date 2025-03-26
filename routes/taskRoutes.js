import { express } from 'express';
import { Router } from 'express';
import * as taskController from '../controllers/taskController.js';
const router = Router();

router.get('/', taskController.getTasks);


export default router;