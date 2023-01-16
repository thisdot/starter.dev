import { useQuery } from './useQuery';

export const useStarterQuery = async (query: string, variables: Record<string, unknown> = {}, signal?: AbortSignal) => {
  const { executeQuery$ } = useQuery(query);

  return executeQuery$({
    url: 'https://api.starter.dev/.netlify/functions/graphql',
    variables,
    signal,
  });
};
