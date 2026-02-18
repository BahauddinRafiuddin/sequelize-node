import authService from "./auth.service.js"

export const register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body)
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data
    })
  } catch (error) {
    next(error)
  }
}

export const login=async (req,res,next) => {
  try {
    const data=await authService.login(req.body)
    return res.status(200).json({
      success:true,
      message:"User login successfull",
      data
    })
  } catch (error) {
    next(error)
  }
}