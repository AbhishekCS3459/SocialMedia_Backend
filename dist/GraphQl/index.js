"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const User_1 = require("./User");
async function createGQLServer() {
    const gqlserver = new server_1.ApolloServer({
        typeDefs: `
        ${User_1.User.typeDefs},
          type Query{${User_1.User.queries}}
        type Mutation { ${User_1.User.mutations}}
        `,
        resolvers: {
            Query: {
                ...User_1.User.resolvers.queries,
            },
            Mutation: {
                ...User_1.User.resolvers.mutations,
            },
        },
    });
    await gqlserver.start();
    return gqlserver;
}
exports.default = createGQLServer;
