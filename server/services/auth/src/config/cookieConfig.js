export const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Lax",
  maxAge: 3600000, // 1 hour
};