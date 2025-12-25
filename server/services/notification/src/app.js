import express from "express";
import { connectRabbitMQ } from "./config/rabbitMqConfig.js";
import { startOtpConsumer } from "./consumer/emailConsumerUser.js";
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
await connectRabbitMQ();
await startOtpConsumer();
export default app;