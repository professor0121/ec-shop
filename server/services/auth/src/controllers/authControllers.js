import asyncHandler from "../utils/asyncHandler.js";
import { authService } from "../services/authService.js";
import { generateToken } from "../utils/jwtToken.js";
import { cookieConfig } from "../config/cookieConfig.js";

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
        // Password reset logic here
        res.status(200).json({ success: true, message: "Password reset successfully" });
    }),

    updateProfile: asyncHandler(async (req, res, next) => {
        // Profile update logic here
        res.status(200).json({ success: true, message: "Profile updated successfully" });
    }),
};