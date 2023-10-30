"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const db_1 = require("../lib/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWTSECRET = "supresecret";
class UserService {
    static async createUser(payload) {
        const { firstName, lastName, email, password } = payload;
        const salt = (0, node_crypto_1.randomBytes)(64).toString("hex");
        const hashedPassword = UserService.generateHash(salt, password);
        return db_1.prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword,
            },
        });
    }
    static generateHash(salt, password) {
        const hashedPassword = (0, node_crypto_1.createHmac)("sha256", salt)
            .update(password)
            .digest("hex");
        return hashedPassword;
    }
    static async getUserByEmail(email) {
        return db_1.prismaClient.user.findUnique({ where: { email } });
    }
    static async GetUserToken(payload) {
        const { email, password } = payload;
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const hashedPassword = UserService.generateHash(user.salt, password);
        if (hashedPassword !== user.password) {
            throw new Error("Invalid password");
        }
        // generate token refresh and access token
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
        }, JWTSECRET, {
            expiresIn: "1d",
        });
        return token;
    }
    static decodeJWTToken(token) {
        return jsonwebtoken_1.default.verify(token, JWTSECRET);
    }
    static async getUserById(id) {
        return await db_1.prismaClient.user.findUnique({ where: { id } });
    }
}
exports.default = UserService;
