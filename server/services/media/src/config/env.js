import { configDotenv } from "dotenv";

configDotenv();

export const CLOUDINARY={
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
}
export const MONGO_URI=process.env.MONGO_URI;