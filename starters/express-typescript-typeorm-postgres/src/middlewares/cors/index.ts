import cors from 'cors';

let middleware = cors();

if (process.env.CORS_ALLOWED_ORIGINS) {
  try {
    const parsedOriginArray = JSON.parse(process.env.CORS_ALLOWED_ORIGINS);
    const allowedOrigins: string[] = Array.isArray(parsedOriginArray)
      ? parsedOriginArray.concat(process.env.HOST_URL)
      : [];

    const corsOptions = {
      origin: (origin, callback) => {
        if (
          allowedOrigins.some((allowedOrigin) => {
            return allowedOrigin.startsWith(origin);
          })
        ) {
          callback(null, true);
        } else {
          callback(new Error('The Current Origin is not allowed by CORS'));
        }
      },
      optionsSuccessStatus: 200,
    };
    middleware = cors(corsOptions);
  } catch (e) {
    console.error(`An error occurred during CORS rule setup, defaulted to ALLOW-ALL`, e);
  }
}

export const corsMiddleware = middleware;
