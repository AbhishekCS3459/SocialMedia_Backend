"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const User_1 = __importDefault(require("../../../../GraphQl/Threads_Backend_Graph_Ql/src/services/User"));
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
        return {};
    },
};
const mutations = {
    createUser: async (_, payload) => {
        const user = await User_1.default.createUser(payload);
        return user.id;
    },
};
exports.resolvers = { queries, mutations };
