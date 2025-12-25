import amqp from "amqplib";
import { RABBIT_MQ } from "./envConfig.js";
let connection = null;
let channel = null;

export const connectRabbitMQ = async () => {
  if (channel) return channel; // prevent multiple connections

  try {
    connection = await amqp.connect({
      protocol: RABBIT_MQ.PROTOCOL,
      hostname: RABBIT_MQ.HOST,
      port: RABBIT_MQ.PORT,
      username: RABBIT_MQ.USERNAME,
      password: RABBIT_MQ.PASSWORD,
      heartbeat: 60
    });

    channel = await connection.createChannel();

    console.log("🐇 RabbitMQ connected From Auth Side");

    // graceful shutdown
    process.on("SIGINT", async () => {
      if (channel) await channel.close();
      if (connection) await connection.close();
      process.exit(0);
    });

    return channel;
  } catch (error) {
    console.error("❌ RabbitMQ connection failed", error);
    process.exit(1);
  }
};

export const getRabbitChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ not connected. Call connectRabbitMQ first.");
  }
  return channel;
};
