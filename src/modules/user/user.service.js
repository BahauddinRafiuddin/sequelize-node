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
    return await User.findAll()
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

}

export default new UserService()