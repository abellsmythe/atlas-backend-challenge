import 'dotenv/config';

import { initApp } from './app';
import { initServer } from './server';
import { terminate } from './terminate';

const { PORT } = process.env;

async function boot() {
  const app = initApp();
  const server = initServer(app);

  app.listen(PORT, '0.0.0.0', () => {
    // tslint:disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
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