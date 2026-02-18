import sequelize from "../config/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../modules/user/user.model.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await sequelize.authenticate();

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.log("Admin credentials not provided in .env");
      process.exit(1);
    }

    const existing = await User.findOne({ where: { email } });

    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "Super Admin",
      email,
      password: hashedPassword,
      role: "ADMIN"
    });

    console.log("Admin created successfully");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
