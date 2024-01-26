import express from 'express';

export function initApp() {
  const app = express();

  app.get('/', (_, res) => {
    res.send('OK');
  });

  return app;
}
