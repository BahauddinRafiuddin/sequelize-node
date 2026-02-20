import express from 'express'
import { authenticate } from '../../middlewares/auth.middleware.js'
import { authorize } from '../../middlewares/role.middleware.js'
import { adminDashboardStatus, deleteUser, getAllUser, getAllUserTasks, getProfile, updateUser } from './user.controller.js'

const userRouter = express.Router()

userRouter.get('/', authenticate, authorize('admin'), getAllUser)
userRouter.get('/profile', authenticate, authorize('user', 'admin'), getProfile)
userRouter.delete('/:userId',authenticate,authorize('admin'),deleteUser)
userRouter.put('/:userId',authenticate,authorize("user","admin"),updateUser)
userRouter.get('/tasks',authenticate,getAllUserTasks)
userRouter.get('/adminStats',authenticate,authorize('admin'),adminDashboardStatus)
export default userRouter