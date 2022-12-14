import { rest } from 'msw';

export const greetingMock = rest.get(
  'https://api.starter.dev/hello',
  (req, res, ctx) => {
    const greeting = req.url.searchParams.get('greeting');
    return res(ctx.text(`Hello, ${greeting}`));
  }
);
