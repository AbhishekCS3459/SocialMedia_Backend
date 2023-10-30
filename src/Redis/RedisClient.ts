import Redis from "ioredis";
import { config } from "dotenv";

config();
const REDIS_PORT: number = parseInt(process.env.REDIS_PORT as string, 10) || 6379;
const REDIS_HOST: string = process.env.REDIS_HOST || "localhost";
const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD || "";

const RedisClient = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
});

export default RedisClient;
