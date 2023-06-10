import { error } from '@sveltejs/kit';

export const getGreeting = async (greeting: string) => {
  const endpoint = new URL('https://api.starter.dev/.netlify/functions/server/hello');
  endpoint.searchParams.append('greeting', greeting);

  const response = await fetch(endpoint);

  if (!response.ok) {
    const resp = await (response.json() as Promise<{ message: string }>);
    throw error(400, resp.message || response.statusText);
  }

  const message: string = await response.text();

  return message;
};
