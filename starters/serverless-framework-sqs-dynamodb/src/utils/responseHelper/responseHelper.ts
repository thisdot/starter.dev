export function responseHelper(statusCode: number, resp: unknown) {
	return {
		statusCode,
		body: typeof resp === 'string' ? resp : JSON.stringify(resp),
	};
}
