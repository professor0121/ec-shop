import {connect} from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
    await connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
}
