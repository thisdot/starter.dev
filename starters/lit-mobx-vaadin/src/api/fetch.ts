const FETCH_API_URL = 'https://api.starter.dev/.netlify/functions/server/hello';

export function fetchMessage(greeting: string): Promise<string> {
  return fetch(`${FETCH_API_URL}?${new URLSearchParams({ greeting })}`)
    .then(response => response.text())
    .catch(error => {
      console.error(error);
      return 'Sorry, something went wrong. Please try again.';
    });
}
