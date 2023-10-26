"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = require("ioredis");
const RedisClient = new ioredis_1.Redis();
exports.default = RedisClient;
