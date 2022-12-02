/* eslint-disable @typescript-eslint/no-explicit-any */
const allowedLogLevels = process.env.ALLOWED_LOG_LEVELS || '[]';

type LogLevel = 'INFO' | 'DEBUG' | 'WARN' | 'ERROR';

let LOG_LEVELS: LogLevel[] = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
try {
  const parsedLogLevels = JSON.parse(allowedLogLevels);
  if (parsedLogLevels.length !== 0) {
    LOG_LEVELS = parsedLogLevels;
  }
} catch (e) {
  console.warn(
    `[WARN] Could not parse ALLOWED_LOG_LEVELS env variable, logger defaults to all levels`,
    e
  );
}

class Logger {
  private enabledLevels: Set<LogLevel>;

  constructor(allowedLogLevels: LogLevel[]) {
    this.enabledLevels = new Set(allowedLogLevels);
    this.log(`Initialising logger with allowed levels: ${allowedLogLevels.join(', ')}`);
  }

  log(message?: any, ...optionalParams: any[]): void {
    if (this.enabledLevels.has('INFO')) {
      if (typeof message === 'string') {
        console.log(`[INFO] ${message}`, ...optionalParams);
      } else {
        console.log(`[INFO]`, message, ...optionalParams);
      }
    }
  }

  info(message?: any, ...optionalParams: any[]): void {
    this.log(message, ...optionalParams);
  }

  debug(message?: any, ...optionalParams: any[]): void {
    if (this.enabledLevels.has('DEBUG')) {
      if (typeof message === 'string') {
        console.debug(`[DEBUG] ${message}`, ...optionalParams);
      } else {
        console.debug(`[DEBUG]`, message, ...optionalParams);
      }
    }
  }

  warn(message?: any, ...optionalParams: any[]): void {
    if (this.enabledLevels.has('WARN')) {
      if (typeof message === 'string') {
        console.warn(`[WARN] ${message}`, ...optionalParams);
      } else {
        console.warn(`[WARN]`, message, ...optionalParams);
      }
    }
  }

  error(message?: any, ...optionalParams: any[]): void {
    if (this.enabledLevels.has('ERROR')) {
      if (typeof message === 'string') {
        console.error(`[ERROR] ${message}`, ...optionalParams);
      } else {
        console.error(`[ERROR]`, message, ...optionalParams);
      }
    }
  }
}

export const LogHelper = new Logger(LOG_LEVELS);
