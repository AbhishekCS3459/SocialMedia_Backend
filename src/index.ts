import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import createGQLServer from "./graphql";
import UserService from "./services/User";
import RedisClient from "./Redis/RedisClient";
const PORT = process.env.PORT;

async function startApolloServer() {
  const app = express();
  app.use(cors());

  app.use(express.json());

  RedisClient.on("connect", () => console.log("Redis Client Connected"));

  RedisClient.on("error", (err) => console.log("Redis Client Error", err));

  const server = await createGQLServer();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers["token"];
        try {
          //@ts-ignore
          const user = UserService.decodeJWTToken(token as string);
          return { user };
        } catch (e) {
          return {};
        }
      },
    })
  );

  app.get("/", (req, res) => {
    res.send("Working app");
  });

  app.listen(PORT, () => {
    console.log(`graphql is running on port http://localhost:${PORT}/graphql`);
  });
}

startApolloServer();
