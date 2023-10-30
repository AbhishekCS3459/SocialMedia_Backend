"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const REDIS_PORT = parseInt(process.env.REDIS_PORT, 10) || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";
const RedisClient = new ioredis_1.default({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
});
exports.default = RedisClient;
