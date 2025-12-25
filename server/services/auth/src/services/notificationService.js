import { getRabbitChannel } from "../config/rabbitMqConfig.js";

export const notificationService = {

  registerWithOtp: async ({ email, otp }) => {
    const channel = getRabbitChannel();

    await channel.assertExchange("AUTH_EXCHANGE", "topic", {
      durable: true
    });

    channel.publish(
      "AUTH_EXCHANGE",
      "auth.register.otp",
      Buffer.from(JSON.stringify({ email, otp })),
      { persistent: true }
    );

    console.log("📤 Register OTP sent to notification service",email,otp);
  },

  resetPassword: async ({ email, otp }) => {
    const channel = getRabbitChannel();

    await channel.assertExchange("AUTH_EXCHANGE", "topic", {
      durable: true
    });

    channel.publish(
      "AUTH_EXCHANGE",
      "auth.reset.otp",
      Buffer.from(JSON.stringify({ email, otp })),
      { persistent: true }
    );

    console.log("📤 Reset OTP sent to notification service");
  }

};
