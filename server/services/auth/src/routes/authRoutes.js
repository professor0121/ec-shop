import { Router } from "express";
import passport from "passport";
import { authControllers } from "../controllers/authControllers.js";
import { authenticatedMiddleware } from "../middlewares/accessMiddleware.js";

const router = Router();
//register with email and password with role
router.post("/register", authControllers.register);

//register with google and login with google
router.post(
    "/login", 
    passport.authenticate("local", { session: true }),
    authControllers.login
);

// Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: true, failureRedirect: "/login" }),
  authControllers.login
);

router.put('/update-profile',authenticatedMiddleware,authControllers.updateProfile);
router.get('/logout',authenticatedMiddleware,authControllers.logout);

router.post('/forgot-password',authControllers.resetPassword);
router.post("/verify-register-otp", authControllers.verifyRegisterOtp);
router.post('/verify-reset-otp',authControllers.verifyResetOtp);
export default router;