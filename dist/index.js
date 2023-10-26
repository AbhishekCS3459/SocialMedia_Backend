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
const PORT = process.env.PORT || 8000;
async function startApolloServer() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
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
        }
    }));
    app.listen(PORT, () => {
        console.log(`graphql is running on port http://localhost:${PORT}/graphql`);
    });
}
startApolloServer();
