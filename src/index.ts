import 'dotenv/config';

import type { ServerRegistration } from 'apollo-server-express';

import { initApp } from './app';
import { initGraphQLServer } from './graphql-server';
import { initServer } from './server';
import { terminate } from './terminate';

const { PORT } = process.env;

async function boot() {
  const app = initApp();
  const server = initServer(app);
  // I have a weird problem with `apollo-server-express` even that internally
  // the package is using the `Application` type from `express`, looks like they
  // have some discrepancies, I assume I have a version problem, plan to review 
  // this one later on
  const graphQLServer = await initGraphQLServer(
    app as ServerRegistration['app']
  );

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(
      `GraphQL Server listening on port ${PORT} at ${graphQLServer.graphqlPath}`
    );
  });

  // Graceful Shutdown
  const shutdown = terminate(server, { coredump: false, timeout: 500 });

  process.on('unhandledRejection', shutdown(1, 'Unhandled Promise'));
  process.on('uncaughtException', shutdown(1, 'Unexpected Error'));
  process.on('SIGTERM', shutdown(0, 'SIGTERM'));
  process.on('SIGINT', shutdown(0, 'SIGINT'));
}

boot().catch((error) => {
  console.error(error);
  process.exit(1);
});
