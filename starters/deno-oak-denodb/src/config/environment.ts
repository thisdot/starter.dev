import { config } from '../../deps.ts';

export const {
	API_HOST,
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
	PORT,
	CORS_ALLOWED_ORIGINS,
} = config({
	safe: true,
	allowEmptyValues: true,
});
