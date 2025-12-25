import express from "express";
import { connectRabbitMQ } from "./config/rabbitMqConfig.js";
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
await connectRabbitMQ();

export default app;