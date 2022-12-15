import express, { Express, NextFunction, Request, Response } from 'express';
import expressOasGenerator, { SPEC_OUTPUT_FILE_BEHAVIOR } from 'express-oas-generator';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { apiRouter } from './modules/router';
import { corsMiddleware } from './middlewares/cors';

export function bootstrapApp(): Express {
	const app = express();

	expressOasGenerator.handleResponses(app, {
		specOutputPath: 'swagger.json',
		writeIntervalMs: 2000,
		swaggerUiServePath: 'docs',
		specOutputFileBehavior: SPEC_OUTPUT_FILE_BEHAVIOR.PRESERVE,
		swaggerDocumentOptions: {
			version: '3.0.3',
		},
	});
	app.use(express.json());

	app.options('*', corsMiddleware);
	app.use(corsMiddleware);

	app.use('/', apiRouter);
	app.use(genericErrorHandler);
	expressOasGenerator.handleRequests();
	return app;
}

function genericErrorHandler(err, req: Request, res: Response, next: NextFunction) {
	console.error('An unexpected error occurred', err);
	res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.send({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
	return next();
}
