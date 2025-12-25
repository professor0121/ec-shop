import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { comparePassword } from "../utils/bcrypt.util.js";
import User from "../models/userModel.js";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./envConfig.js";


/* ----------------------------------------
   LOCAL STRATEGY (Username OR Email)
---------------------------------------- */
passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "identifier", passwordField: "password", session: false },
    async (identifier, password, done) => {
      try {
        const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });

        if (!user) return done(null, false, { message: "User not found" });
        if (!user.password) return done(null, false, { message: "Use Google login" });

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return done(null, false, { message: "Invalid password" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
/* ----------------------------------------
   GOOGLE STRATEGY
---------------------------------------- */
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        let user = await User.findOne({
          $or: [
            { googleId: profile.id },
            { email }
          ]
        });

        // First time Google login
        if (!user) {
          user = await User.create({
            email,
            googleId: profile.id,
            provider: "google"
          });
        }
        // Account linking (email exists, password login before)
        else if (!user.googleId) {
          user.googleId = profile.id;
          user.provider = "google";
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

/* ----------------------------------------
   SERIALIZE / DESERIALIZE
   (Required even if session: false)
---------------------------------------- */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
