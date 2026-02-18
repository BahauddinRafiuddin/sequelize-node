import express from 'express'
import { authenticate } from '../../middlewares/auth.middleware.js'
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from './task.controller.js'
const taskRouter = express.Router()

taskRouter.post('/', authenticate, createTask)
taskRouter.get('/', authenticate, getTasks)
taskRouter.get('/:taskId', authenticate, getTaskById)
taskRouter.delete('/:taskId', authenticate,deleteTask)
taskRouter.put('/:taskId',authenticate,updateTask)
export default taskRouter