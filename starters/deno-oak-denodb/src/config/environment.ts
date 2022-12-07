import { config } from '../../deps.ts';

export const { API_HOST, PORT, CORS_ALLOWED_ORIGINS } = config({ safe: true, allowEmptyValues: true });
