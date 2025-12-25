import { verifyToken } from "../utils/jwtToken.js";

export const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user logged in" });
    }
    if (user.role !== requiredRole) {
      return res.status(403).json({ success: false, message: "Forbidden: Insufficient permissions" });
    }
    next();
  }
};

export const authenticatedMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }
    const encoded = verifyToken(token);
    req.user = encoded;
    next();
}