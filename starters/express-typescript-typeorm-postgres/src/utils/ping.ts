import net from 'net';

const DEFAULT_PING_TIMEOUT = parseInt(process.env.PING_TIMEOUT) || 3000;

export enum PingResult {
  PONG = 'PONG',
  TIMEOUT = 'TIMEOUT',
  ERROR = 'ERROR',
}

export async function ping(hostname, port): Promise<PingResult> {
  return new Promise((resolve) => {
    const socket = net.createConnection(port, hostname);
    socket.setTimeout(DEFAULT_PING_TIMEOUT);
    socket.on('connect', () => {
      socket.end();
      resolve(PingResult.PONG);
    });
    socket.on('timeout', () => {
      socket.destroy();
      console.error(
        `Could not establish ping connection in under 3 seconds to ${hostname}:${port}`
      );
      resolve(PingResult.TIMEOUT);
    });
    socket.on('error', (err: Error) => {
      socket.destroy();
      console.error(`An error occurred when pinging ${hostname}:${port}`, err);
      resolve(PingResult.ERROR);
    });
  });
}
