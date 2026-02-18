import { where } from "sequelize"
import { ApiError } from "../../utils/ApiError.js"
import Task from "./task.model.js"

class TaskService {
  // Create Task
  async createTask(data, userId) {
    const { title } = data
    if (!title) {
      throw new ApiError(400, "Please Provide Title!")
    }
    return await Task.create({ ...data, userId })
  }

  // Get Tasks
  async getTasks(currentUser) {
    if (currentUser.role === 'admin') {
      return await Task.findAll()
    }

    // Normal User Tasks
    return await Task.findAll({ where: { userId: currentUser.id } })
  }

  // Get Task By Id
  async getTaskById(id, currentUser) {
    const task = await Task.findByPk(id);

    if (!task) return null;

    // If not admin and not owner → deny
    if (
      currentUser.role !== 'admin' &&
      task.userId !== currentUser.id
    ) {
      throw new ApiError(403, "Access denied");
    }

    return task;
  }

  // Delete Task
  async deleteTask(id, currentUser) {
    const task = await this.getTaskById(id, currentUser);

    if (!task) {
      throw new ApiError(404, "Task does not exist");
    }

    await task.destroy();

    return task;
  }

  // Update Task
  async updateTask(id, data, currentUser) {
    const task = await this.getTaskById(id, currentUser);

    if (!task) {
      throw new ApiError(404, "Task does not exist");
    }

    await task.update(data);

    return task;
  }
}

export default new TaskService()