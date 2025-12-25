import { configDotenv } from "dotenv";

configDotenv();

export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/defaultdb";

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

export const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey";