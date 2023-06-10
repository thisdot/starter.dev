/* eslint-disable @typescript-eslint/no-explicit-any */
import * as process from 'process';

export const ALL_LOG_LEVELS = 'INFO,DEBUG,WARN,ERROR';
type LogLevel = 'INFO' | 'DEBUG' | 'WARN' | 'ERROR';

const LOG_LEVELS: LogLevel[] = (process.env.ALLOWED_LOG_LEVELS || ALL_LOG_LEVELS).split(
	','
) as LogLevel[];

const ENABLED_LEVELS = new Set<LogLevel>(LOG_LEVELS);

function logger(method, level: LogLevel = 'INFO') {
	return (message?: unknown, ...optionalParams: unknown[]) => {
		if (ENABLED_LEVELS.has(level)) {
			if (typeof message === 'string') {
				console[method](`[${level}] ${message}`, ...optionalParams);
			} else {
				console[method](`[${level}]`, message, ...optionalParams);
			}
		}
	};
}

export const LogHelper = {
	log: logger('log'),
	info: logger('info'),
	debug: logger('debug', 'DEBUG'),
	warn: logger('warn', 'WARN'),
	error: logger('error', 'ERROR'),
};
