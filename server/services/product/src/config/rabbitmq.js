import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

let channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect({
      protocol: process.env.RABBITMQ_PROTOCOL,
      hostname: process.env.RABBITMQ_HOST,
      port: Number(process.env.RABBITMQ_PORT),
      username: process.env.RABBITMQ_USERNAME,
      password: process.env.RABBITMQ_PASSWORD,
      heartbeat: 60
    });

    channel = await connection.createChannel();
    console.log("✅ RabbitMQ connected");
  } catch (error) {
    console.error("❌ RabbitMQ connection failed");
    console.error(error.message);
  }
};

export const getChannel = () => channel;
