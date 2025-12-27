import {connect}  from "mongoose"
import { MONGO_URI } from "./env.js";

export async function connectDB(){
    try{
        await connect(MONGO_URI);
        console.log("Media Service DB connected successfully");
    }catch(err){
        console.log("Error connecting to Media Service DB", err);
    }
};
