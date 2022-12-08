import { log } from '../../deps.ts';
import { LOG_LEVEL } from '../config/environment.ts';

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler(LOG_LEVEL, {
      formatter: '{datetime} {levelName} {msg}',
    }),
  },

  loggers: {
    default: {
      level: LOG_LEVEL,
      handlers: ['console'],
    },
  },
});

export const logger = log.getLogger();
