import { mailTransporter } from "../config/mailConfig.js";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await mailTransporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Email sending failed", error);
    throw error;
  }
};
