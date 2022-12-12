import { log } from '../../deps.ts';
import { LOG_LEVEL } from '../config/environment.ts';

const environmentLogLevel = LOG_LEVEL as log.LevelName;

await log.setup({
	handlers: {
		console: new log.handlers.ConsoleHandler(environmentLogLevel, {
			formatter: '{datetime} {levelName} {msg}',
		}),
	},

	loggers: {
		default: {
			level: environmentLogLevel,
			handlers: ['console'],
		},
	},
});

export const logger = log.getLogger();
