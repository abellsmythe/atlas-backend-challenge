import { createServer } from 'http';

import type { Application } from 'express';

export function initServer(app: Application) {
  return createServer(app);
}
