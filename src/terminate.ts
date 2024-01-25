import type { Server } from 'http';

export function terminate<T extends Server>(
  server: T,
  options = { coredump: false, timeout: 500 }
) {
  // Exit function
  const exitHandler = (code: number) => {
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code: number, reason: string) => () => {
    // tslint:disable-next-line no-console
    console.error(`Process ${process.pid} received ${code} a ${reason} signal`);

    // Attempt a graceful shutdown
    server.close();
    setTimeout(exitHandler, options.timeout);
  };
}
