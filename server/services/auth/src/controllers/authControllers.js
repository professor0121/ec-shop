import asyncHandler from "../utils/asyncHandler.js";
import { authService } from "../services/authService.js";
import { generateToken } from "../utils/jwtToken.js";
import { cookieConfig } from "../config/cookieConfig.js";
import {notificationService} from "../services/notificationService.js"

export const authControllers = {
    login: asyncHandler(async (req, res, next) => {
        const accessToken = generateToken({ id: req.user._id, email: req.user.email, role: req.user.role });
        res.cookie("accessToken", accessToken, cookieConfig);
        res.json({
            success: true,
            message: "Logged in successfully",
            user: {
                id: req.user._id,
                email: req.user.email,
                username: req.user.username,
                role: req.user.role
            }
        });
    }),

    register: asyncHandler(async (req, res, next) => {
        const { email, password, } = req.body;
        const data = await authService.register({ email, password });
        res.status(201).json(data);
    }),

    logout: asyncHandler(async (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err);
            req.session.destroy(() => {
                res.clearCookie("sessionId"); // remove cookie from client
                res.json({ success: true, message: "Logged out successfully" });
            });
        });
    }),

    refreshToken: asyncHandler(async (req, res, next) => {
        // Token refresh logic here
        res.status(200).json({ success: true, message: "Token refreshed successfully" });
    }),

    resetPassword: asyncHandler(async (req, res, next) => {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        await authService.resetPassword(email);
        res.status(200).json({ success: true, message: "Password reset successfully" });
    }),

    verifyResetOtp: asyncHandler(async (req, res, next) => {
        const { email, otp } = req.body;
        const result = await authService.verifyResetOtp(email, otp);
        if (result.success) {
            res.status(200).json({ success: true, message: "OTP verified successfully" });
        } else {
            res.status(400).json({ success: false, message: result.message });
        }
    }),

    verifyRegisterOtp: asyncHandler(async (req, res, next) => {
        const { email, otp } = req.body;
        const result = await authService.verifyRegisterOtp(email, otp);
        if (result.success) {
            res.status(200).json({ success: true, message: "OTP verified successfully" });
        } else {
            res.status(400).json({ success: false, message: result.message });
        }
    }),

    updateProfile: asyncHandler(async (req, res, next) => {
        const {email}=req.user.email;
        const updateData=req.body;
        await authService.updateProfile(email,updateData);
        res.status(200).json({ success: true, message: "Profile updated successfully" });
    }),
};