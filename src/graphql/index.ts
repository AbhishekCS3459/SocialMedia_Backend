import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { User } from "./User";
export default async function createGQLServer() {
  const gqlserver = new ApolloServer({
    typeDefs: `
        ${User.typeDefs},
          type Query{${User.queries}}
        type Mutation { ${User.mutations}}
        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
      plugins: [
    // Install a landing page plugin based on NODE_ENV
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({
          includeCookies: true,
          document:'https://www.notion.so/Getting-started-with-docs-93392613765c4c8e8df3326ddf0d50ed?pvs=4',
          footer: true,
        })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
  });

  await gqlserver.start();
  return gqlserver;
}
