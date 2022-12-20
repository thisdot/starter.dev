import { getGreeting } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const greeting = url.searchParams.get('greeting');
  const message = await getGreeting(greeting ?? 'This Dot Labs!');

  return {
    message,
  };
};
