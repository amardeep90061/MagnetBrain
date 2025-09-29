import express from 'express';
import { createTask,getTasks,updateTask,deleteTask,getTaskById } from '../controllers/task.js'; 
import { isloggedIn } from '../middlewares/auth.js';

const router = express.Router();

router.post('/createTask',isloggedIn, createTask);

router.get('/tasks',isloggedIn,getTasks);

router.put('/task/:id',isloggedIn,updateTask)
.delete('/task/:id',isloggedIn,deleteTask)
.get('/task/:id',isloggedIn,getTaskById);

export default router;