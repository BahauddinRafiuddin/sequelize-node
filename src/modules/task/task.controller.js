import { ApiError } from "../../utils/ApiError.js"
import taskService from "./task.service.js"

export const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body, req.user.id)
    return res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      task
    })
  } catch (error) {
    next(error)
  }
}
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks(req.user)
    if (tasks.length === 0) {
      throw new ApiError(404, "No task found!")
    }
    return res.status(200).json({
      success: true,
      message: 'Task Found Successfully',
      tasks
    })
  } catch (error) {
    next(error)
  }
}
export const getTaskById = async (req, res, next) => {
  try {
    const { taskId } = req.params
    const task = await taskService.getTaskById(taskId, req.user)
    if (!task) {
      throw new ApiError(404, "Task Does Not Exists")
    }

    return res.status(200).json({
      success: true,
      message: "Task Found ",
      task
    })
  } catch (error) {
    next(error)
  }
}
export const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params
    await taskService.deleteTask(taskId, req.user)
    return res.status(200).json({
      success: true,
      message: "Task Deleted Successfully ",
    })
  } catch (error) {
    next(error)

  }
}
export const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params
    const updatedTask = await taskService.updateTask(taskId, req.body, req.user)
    return res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      updatedTask
    })
  } catch (error) {
    next(error)
  }
}