import { Redis } from "ioredis";
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const RedisClient = new Redis(redisUrl);

export default RedisClient;
