"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const default_1 = require("@apollo/server/plugin/landingPage/default");
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
        plugins: [
            // Install a landing page plugin based on NODE_ENV
            process.env.NODE_ENV === 'production'
                ? (0, default_1.ApolloServerPluginLandingPageProductionDefault)({
                    includeCookies: true,
                    document: 'https://www.notion.so/Getting-started-with-docs-93392613765c4c8e8df3326ddf0d50ed?pvs=4',
                    footer: true,
                })
                : (0, default_1.ApolloServerPluginLandingPageLocalDefault)({ footer: false }),
        ],
    });
    await gqlserver.start();
    return gqlserver;
}
exports.default = createGQLServer;
