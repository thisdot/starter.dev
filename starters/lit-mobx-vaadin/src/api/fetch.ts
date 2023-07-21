const FETCH_API_URL = 'https://api.starter.dev/.netlify/functions/server/hello';

export function fetchMessage(greeting: string): Promise<string> {
	const url = new URL(FETCH_API_URL);
	url.searchParams.append('greeting', greeting);
	return fetch(url).then(
		response => response.text(),
	);
}
