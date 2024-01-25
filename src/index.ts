import { initApp } from './app';
import { initServer } from './server';

async function boot() {
  const app = initApp();
  const server = initServer(app);

  app.listen(3000, '0.0.0.0', () => {
    // tslint:disable-next-line no-console
    console.log(`Server listening on port 3000`);
  });
}

boot().catch(console.error);