import { ApiError } from "../utils/ApiError.js";

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, "Access denied"));
    }
    next();
  };
};
