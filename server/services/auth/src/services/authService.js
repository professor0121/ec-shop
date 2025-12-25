// authService.js
import AppError from "../utils/appError.js";
import { userDao } from "../dao/userDao.js";
import { hashPassword } from "../utils/bcrypt.util.js";

export const authService = {
  register: async ({ email, password }) => {
    if (!email || !password) {
      throw new AppError("Email and Password are required", 400);
    }
    const existingUser = await userDao.findByEmail(email);
    if (existingUser) {
      throw new AppError("User already exists with this email", 400);
    }
    const hashedPassword = await hashPassword(password);
    const user = await userDao.create({ email, password: hashedPassword });

    return {
      success: true,
      message: "Registered successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    };
  },
};
