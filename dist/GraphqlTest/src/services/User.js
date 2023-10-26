"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
class User {
    //createUser
    static async createUser(payload) {
        try {
            await (0, db_1.prismaClient)().user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password,
                },
            });
        }
        catch (error) {
        }
    }
}
exports.default = User;
