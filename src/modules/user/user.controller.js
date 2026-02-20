import { ApiError } from "../../utils/ApiError.js"
import bcrypt from 'bcrypt'
import userService from "./user.service.js"


export const getAllUser = async (req, res, next) => {
  try {
    const users = await userService.findALl()
    return res.status(200).json({
      success: true,
      message: "Users Found Successfully",
      users
    })
  } catch (error) {
    next(error)
  }
}

export const getProfile = async (req, res, next) => {
  try {
    const user = await userService.findById(req.user.id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user
    });

  } catch (error) {
    next(error);
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    const user = await userService.findById(userId)
    if (!user) {
      throw new ApiError(404, "User Not Found")
    }
    const deletedUser = await userService.delete(userId)
    return res.status(200).json({
      success: true, message: "User Deleted Successfully", deletedUser
    })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { name, email, password, role } = req.body
    if (role) {
      throw new ApiError(401, "You Cant Change Role")
    }
    let hashPass;
    if (password) {
      hashPass = await bcrypt.hash(password, 10)
    }
    let data = {
      name: name,
      email: email,
      password: hashPass
    }
    const user = await userService.findById(userId)
    if (!user) {
      throw new ApiError(404, "User Not Found")
    }

    const updatedUser = await userService.update(userId, data)
    return res.status(201).json({
      success: true,
      message: "User Updates Successfully",
      updatedUser
    })
  } catch (error) {
    next(error)
  }
}

export const getAllUserTasks = async (req, res, next) => {
  try {
    const result = await userService.userTask(req.user.id)
    return res.status(200).json({
      success: true,
      result
    })
  } catch (error) {
    next(error)
  }
}

export const adminDashboardStatus = async (req, res, next) => {
  try {
    const data = await userService.adminDashboardData()
    return res.status(200).json({
      success: true,
      message: "Data Fetched Suceessfully",
      data
    })
  } catch (error) {
    next(error)
  }
}