import redisClient from "../config/redisConfig.js";

export const setOtp = async (email, otp, password) => {
  const key = `otp:${email}`;

  await redisClient.set(
    key,
    JSON.stringify({ otp, password }),
    { EX: 300 } // 5 min TTL
  );
};

export const getOtpFromRedis = async (email) => {
  const data = await redisClient.get(`otp:${email}`);
  return data ? JSON.parse(data) : null;
};

export const deleteOtp = async (email) => {
  await redisClient.del(`otp:${email}`);
};



export const saveOtpToRedis = async ({ email, otp }) => {
  const key = `otp:${email}`;

  await redisClient.set(
    key,
    otp,
    { EX: 300 } // 5 minutes TTL
  );
};