import express from 'express'
import { authenticate } from '../../middlewares/auth.middleware.js'
import { authorize } from '../../middlewares/role.middleware.js'
import { getAllUser, getProfile } from './user.controller.js'

const userRouter = express.Router()

userRouter.get('/', authenticate, authorize('admin'), getAllUser)
userRouter.get('/profile', authenticate, authorize('user', 'admin'), getProfile)
export default userRouter