"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const RedisClient_1 = __importDefault(require("../../Redis/RedisClient"));
const User_1 = __importDefault(require("../../services/User"));
const queries = {
    getUserToken: async (_, payload) => {
        try {
            const cachedToken = await RedisClient_1.default.get(`userToken:${payload.email}`);
            if (cachedToken) {
                return cachedToken;
            }
            const token = await User_1.default.GetUserToken({
                email: payload.email,
                password: payload.password,
            });
            // Cache the token with an expiration (e.g., 86400==1day seconds)
            await RedisClient_1.default.setex(`userToken:${payload.email}`, 86400, token);
            return token;
        }
        catch (e) {
            throw new Error(e.message);
        }
    },
    getCurrentUserLoggedInUser: async (_, parameters, context) => {
        if (context && context.user) {
            const id = context.user.id;
            // Check if the user data is already in the cache
            const cachedUserData = await RedisClient_1.default.get(`userData:${id}`);
            if (cachedUserData) {
                return JSON.parse(cachedUserData);
            }
            const user = await User_1.default.getUserById(id);
            // Cache the user data with an expiration (e.g., 3600 seconds)
            await RedisClient_1.default.setex(`userData:${id}`, 86400, JSON.stringify(user));
            return user;
        }
        throw new Error("User not found");
    },
};
const mutations = {
    createUser: async (_, payload) => {
        const user = await User_1.default.createUser(payload);
        // Clear any cached data for this user when they create a new account
        await RedisClient_1.default.del(`userData:${user.id}`);
        return user.id;
    },
};
exports.resolvers = { queries, mutations };
