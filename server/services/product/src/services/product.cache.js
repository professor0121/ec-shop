import redis from "../config/redis.js";

export const cacheFetch = async (key, cb, ttl = 60) => {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const data = await cb();
  await redis.setEx(key, ttl, JSON.stringify(data));
  return data;
};
