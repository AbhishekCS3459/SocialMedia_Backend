"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const graphql_1 = __importDefault(require("./graphql"));
const User_1 = __importDefault(require("./services/User"));
const RedisClient_1 = __importDefault(require("./Redis/RedisClient"));
const db_1 = require("./lib/db");
const PORT = process.env.PORT;
async function startApolloServer() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    db_1.prismaClient
        .$connect()
        .then(() => console.log("Prisma Client Connected"))
        .catch((e) => console.log("Prisma Client Connection Error", e));
    RedisClient_1.default.on("connect", () => console.log("Redis Client Connected"));
    RedisClient_1.default.on("error", (err) => console.log("Redis Client Error", err));
    const server = await (0, graphql_1.default)();
    app.use("/graphql", (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => {
            const token = req.headers["token"];
            try {
                //@ts-ignore
                const user = User_1.default.decodeJWTToken(token);
                return { user };
            }
            catch (e) {
                return {};
            }
        },
    }));
    app.get("/", (req, res) => {
        res.send("Working app");
    });
    app.listen(PORT, () => {
        console.log(`graphql is running on port http://localhost:${PORT}/graphql`);
    });
}
startApolloServer();
