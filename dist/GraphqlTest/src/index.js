import { ApolloServer } from "@apollo/server";
import cors from "cors";
import express from "express";
import { queries } from '../../GraphQl/Threads_Backend_Graph_Ql/src/graphql/User/queries';
const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());
const server = new ApolloServer({
    queries,
    typeDefs: ''
});
// app.use('/graphql',expressMiddleware(server));
app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);
});
