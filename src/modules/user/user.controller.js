import { ApiError } from "../../utils/ApiError.js"

import userService from "./user.service.js"


export const getAllUser=async (req,res,next) => {
  try {
    const users=await userService.findALl()
    return res.status(200).json({
      success:true,
      message:"Users Found Successfully",
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
};
