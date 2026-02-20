import { Op } from "sequelize";
import Task from "../task/task.model.js";
import User from "./user.model.js";

class UserService {
  // To Create User
  async createUser(data) {
    return await User.create(data)
  }

  // Find By Email
  async findByEmail(email) {
    return await User.findOne({ where: { email } })
  }

  // find by id
  async findById(id) {
    return await User.findByPk(id)
  }

  // find all users
  async findALl() {
    return await User.findAll({
      where: { role: 'user' }
    })
  }

  // update user
  async update(id, data) {
    await User.update(data, { where: { id } })
    return this.findById(id)
  }

  // delete user
  async delete(id) {
    return await User.destroy({ where: { id } })
  }

  async userTask(id) {
    return await User.findOne({
      where: { id },
      include: { model: Task }
    })
  }

  async adminDashboardData() {
    const totalTask = await Task.count()
    const totalUser = await User.count({
      where: {
        role: { [Op.ne]: ['admin'] }
      }
    })
    const completedTasks = await Task.count({
      where: {
        status: { [Op.eq]: ['completed'] }
      }
    })
    const pendingTasks = await Task.count({
      where: {
        status: { [Op.eq]: ['pending'] }
      }
    })

    return { totalTask, totalUser, completedTasks, pendingTasks }
  }
}

export default new UserService()