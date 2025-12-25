import session from "express-session";
import cookieParser from "cookie-parser";

export const configureSession = (app) => {
  // parse cookies
  app.use(cookieParser());

  // session configuration
  app.use(
    session({
      name: "sessionId", // cookie name
      secret: process.env.SESSION_SECRET || "supersecret", // secret key to sign the cookie
      resave: false, // don’t save session if unmodified
      saveUninitialized: false, // only save session when initialized
      cookie: {
        httpOnly: true, // prevents client-side JS access
        secure: process.env.NODE_ENV === "production", // HTTPS only in prod
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: "lax" // CSRF protection
      }
    })
  );
};
