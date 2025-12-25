import { configDotenv } from "dotenv";

configDotenv();

export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/defaultdb";

export const RABBIT_MQ={
    PROTOCOL:process.env.RABBITMQ_PROTOCOL ||"amqp",
    HOST:process.env.RABBITMQ_HOST ||"localhost",
    PORT:process.env.RABBITMQ_PORT ||5672,
    USERNAME:process.env.RABBITMQ_USERNAME ||"admin",
    PASSWORD:process.env.RABBITMQ_PASSWORD ||"admin123",
}