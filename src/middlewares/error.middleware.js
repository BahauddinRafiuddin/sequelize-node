export const errorHandler = (err, req, res, next) => {
  console.error(err); // log for debugging

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Sequelize Unique Constraint
  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = "Duplicate field value";
  }

  // Sequelize Validation Error
  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = err.errors.map(e => e.message).join(", ");
  }

  // Sequelize Foreign Key Error
  if (err.name === "SequelizeForeignKeyConstraintError") {
    statusCode = 400;
    message = "Invalid foreign key reference";
  }

  // Hide internal error details in production
  if (process.env.NODE_ENV === "production" && statusCode === 500) {
    message = "Something went wrong";
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};
