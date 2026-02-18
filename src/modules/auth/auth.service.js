import { ApiError } from "../../utils/ApiError.js"
import bcrypt from "bcrypt"
import userService from "../user/user.service.js"
import jwt from "jsonwebtoken"
import User from "../user/user.model.js"
class AuthService {
  async register(data) {
    const { name, email, password } = data

    if (!name || !email || !password) {
      throw new ApiError(400, "all fields are require")
    }

    const existing = await userService.findByEmail(email)
    if (existing) {
      throw new ApiError(400, "User already exists!")
    }
    const hashPass = await bcrypt.hash(password, 10)
    const user = {
      name: name,
      email: email,
      password: hashPass,
      role: "user"
    }
    const createdUser = userService.createUser(user)
    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role
    }
  }

  async login(data) {
    const { email, password } = data
    if (!email || !password) {
      throw new ApiError(400, "all fields are require")
    }

    const existing = await User.scope("withPassword").findOne({
      where: { email }
    })
    
    if (!existing) {
      throw new ApiError(404, "User does not exists!")
    }

    const isPassValid = await bcrypt.compare(password, existing.password)
    if (!isPassValid) {
      throw new ApiError(400, "Invalid credentials")
    }

    const token = jwt.sign({ id: existing.id, role: existing.role }, process.env.JWT_SECRET, { expiresIn: "2h" })

    return {
      id: existing.id,
      name: existing.name,
      email: existing.email,
      role: existing.role,
      token
    }
  }
}

export default new AuthService()