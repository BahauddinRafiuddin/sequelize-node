import { ApiError } from "../utils/ApiError.js";
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";

dotenv.config()

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized - Token missing");
    }
    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded  // { id, role }
    next()

  } catch (error) {
    next(new ApiError(401, "Unauthorized - Invalid or expired token"))
  }
}