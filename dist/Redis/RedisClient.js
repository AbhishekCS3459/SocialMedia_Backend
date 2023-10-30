"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = require("ioredis");
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const RedisClient = new ioredis_1.Redis(redisUrl);
exports.default = RedisClient;
