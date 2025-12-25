import nodemailer from "nodemailer";
import { EMAIL } from "./envConfig.js";
export const mailTransporter = nodemailer.createTransport({
  host: EMAIL.HOST,
  port: EMAIL.PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: EMAIL.USER,
    pass: EMAIL.PASS
  }
});

// Optional: verify connection at startup
export const verifyMailer = async () => {
  try {
    await mailTransporter.verify();
    console.log("📧 Mail server connected");
  } catch (error) {
    console.error("❌ Mail server error", error);
  }
};
