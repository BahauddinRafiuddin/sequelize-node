import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import User from "../user/user.model.js";

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM("pending", "in_progress", "completed"),
    defaultValue: "pending",
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  }
}, {
  timestamps: true,
  tableName: 'tasks'
}
)

// Association
User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" })
Task.belongsTo(User, { foreignKey: "userId" })

export default Task