// authService.js
import AppError from "../utils/appError.js";
import { userDao } from "../dao/userDao.js";
import { hashPassword } from "../utils/bcrypt.util.js";
import { generateOtp } from "../utils/genrateOtp.js";
import { saveOtpToRedis,getOtpFromRedis } from "../utils/redisUtil.js";
import { notificationService } from "./notificationService.js";

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
    const user = await userDao.create({ email, password: hashedPassword, isVerified: false });

    const otp=generateOtp();
    console.log("OTP generated for registration:", otp, email);
    await saveOtpToRedis({email,otp})
    await notificationService.registerWithOtp({email, otp});
    return {
      success: true,
      message: "Registered successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      },
    };
  },

  resetPassword: async (email) => {
    const user = await userDao.findByEmail(email);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const otp = generateOtp();
    console.log("OTP generated for password reset:", otp, email);
    await saveOtpToRedis({email,otp})
    await notificationService.resetPassword({ email, otp });
  },

  verifyResetOtp: async (email, otp) => {
    const user = await userDao.findByEmail(email);
    if (!user) {
      return { success: false, message: "User not found" };
    }
    const savedOtp = await getOtpFromRedis(email);
    if (savedOtp !== otp) {
      return { success: false, message: "Invalid OTP" };
    }
    return { success: true };
  },

  verifyRegisterOtp: async (email, otp) => {
    const user = await userDao.findByEmail(email);
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (user.isVerified) {
      return { success: false, message: "User already verified" };
    }
    const savedOtp = await getOtpFromRedis(email);
    if (savedOtp !== otp) {
      return { success: false, message: "Invalid OTP" };
    } 
    await userDao.updateByEmail(email, { isVerified: true });
    return { success: true };
  },


  updateProfile: async (email, updateData) => {
    const user = await userDao.findByEmail(email);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    await userDao.updateByEmail(email, updateData);
  }

};
