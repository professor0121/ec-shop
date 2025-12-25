import { Router } from "express";
import passport from "passport";
import { authControllers } from "../controllers/authControllers.js";

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

export default router;