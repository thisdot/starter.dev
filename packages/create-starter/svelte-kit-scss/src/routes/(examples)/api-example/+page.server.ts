import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const endpoint = 'https://api.starter.dev/hello?greeting=This Dot Labs!';

  const response = await fetch(endpoint);

  const message: string = await response.text();

  return {
    message,
  };
};
