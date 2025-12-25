import { connectRabbitMQ, getRabbitChannel } from "../config/rabbitMqConfig.js";
import { sendEmail } from "../services/sendEmail.js";

export const startOtpConsumer = async () => {
  await connectRabbitMQ();
  const channel = getRabbitChannel();

  await channel.assertExchange("AUTH_EXCHANGE", "topic", { durable: true });

  // Register OTP
  await channel.assertQueue("REGISTER_OTP_QUEUE", { durable: true });
  await channel.bindQueue(
    "REGISTER_OTP_QUEUE",
    "AUTH_EXCHANGE",
    "auth.register.otp"
  );

  // Reset OTP
  await channel.assertQueue("RESET_OTP_QUEUE", { durable: true });
  await channel.bindQueue(
    "RESET_OTP_QUEUE",
    "AUTH_EXCHANGE",
    "auth.reset.otp"
  );

  channel.consume("REGISTER_OTP_QUEUE", async (msg) => {
    const { email, otp } = JSON.parse(msg.content.toString());
    console.log("email and otp is recieved in noti",email,otp)
    await sendEmail({
      to: email,
      subject: "Verify your account",
      html: `<h2>Your OTP is ${otp}</h2>`
    });
    channel.ack(msg);
  });

  channel.consume("RESET_OTP_QUEUE", async (msg) => {
    const { email, otp } = JSON.parse(msg.content.toString());
    await sendEmail({
      to: email,
      subject: "Reset Password OTP",
      html: `<h2>Your OTP is ${otp}</h2>`
    });
    channel.ack(msg);
  });
};
