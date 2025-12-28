import {createClient} from "redis";

const redis=createClient({
    url:process.env.REDIS_URL
});

redis.on("connect",()=>{
    console.log("Connected to Redis");
});

redis.on("error",(err)=>{
    console.error("Redis connection error:",err);
});

export default redis;