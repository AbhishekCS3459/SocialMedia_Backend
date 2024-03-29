import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import createGQLServer from "./graphql";
import UserService from "./services/User";
import RedisClient from "./Redis/RedisClient";
import { prismaClient } from "./lib/db";
const PORT = process.env.PORT;

async function startApolloServer() {
  const app = express();
  app.use(cors());

  app.use(express.json());

  prismaClient
    .$connect()
    .then(() => console.log("Prisma Client Connected"))
    .catch((e) => console.log("Prisma Client Connection Error", e));

  RedisClient.on("connect", () => console.log("Redis Client Connected"));

  RedisClient.on("error", (err) => console.log("Redis Client Error", err));

  const server = await createGQLServer();

  app.use(
    "/",
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

  app.get("/healthcheck", (req, res) => {
    res.send("Working app");
  });

  app.listen(PORT, () => {
    console.log(`graphql is running on port http://localhost:${PORT}/graphql`);
  });
}

startApolloServer();
