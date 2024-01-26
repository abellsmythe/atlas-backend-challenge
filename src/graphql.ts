import { ApolloServer } from 'apollo-server-express';

import type { ServerRegistration } from 'apollo-server-express';

import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

export async function initGraphQLServer(app: ServerRegistration['app']) {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: '/graphql',
  });

  return server;
}
