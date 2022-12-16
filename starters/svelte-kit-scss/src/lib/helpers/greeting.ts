export const getGreeting = async (greeting: string) => {
  
    const endpoint = new URL ('https://api.starter.dev/.netlify/functions/server/hello');
    endpoint.searchParams.append('greeting', greeting);
  
    const response = await fetch(endpoint);
    const message: string = await response.text();
  
    return message
  };