"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const User_1 = __importDefault(require("../../services/User"));
const queries = {
    getUserToken: async (_, payload) => {
        try {
            const token = await User_1.default.GetUserToken({
                email: payload.email,
                password: payload.password,
            });
            return token;
        }
        catch (e) {
            throw new Error(e.message);
        }
    },
    getCurrentUserLoggedInUser: async (_, parameters, context) => {
        if (context && context.user) {
            const id = context.user.id;
            const user = await User_1.default.getUserById(id);
            return user;
        }
        throw new Error("User not found");
    },
};
const mutations = {
    createUser: async (_, payload) => {
        const user = await User_1.default.createUser(payload);
        return user.id;
    },
};
exports.resolvers = { queries, mutations };
