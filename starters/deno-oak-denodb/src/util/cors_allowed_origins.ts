import { CORS_ALLOWED_ORIGINS } from '../config/environment.ts';

/**
 * Extracts list of allowed origins for CORS.
 * @returns {string[]}
 */
export function corsAllowedOrigins(): string[] {
	return CORS_ALLOWED_ORIGINS ? CORS_ALLOWED_ORIGINS.split(',') : [];
}
