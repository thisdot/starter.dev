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

  log(...args) {
    if (this.enabledLevels.has('INFO')) {
      const [message, ...rest] = args;
      console.log(`[INFO] ${message}`, ...rest);
    }
  }

  info(...args) {
    this.log(...args);
  }

  debug(...args) {
    if (this.enabledLevels.has('DEBUG')) {
      const [message, ...rest] = args;
      console.debug(`[DEBUG] ${message}`, ...rest);
    }
  }

  warn(...args) {
    if (this.enabledLevels.has('WARN')) {
      const [message, ...rest] = args;
      console.warn(`[WARN] ${message}`, ...rest);
    }
  }

  error(...args) {
    if (this.enabledLevels.has('ERROR')) {
      const [message, ...rest] = args;
      console.error(`[ERROR] ${message}`, ...rest);
    }
  }
}

export const LogHelper = new Logger(LOG_LEVELS);
