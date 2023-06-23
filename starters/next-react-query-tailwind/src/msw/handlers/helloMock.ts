import { rest } from 'msw';

export const helloMock = rest.get(
  'http://localhost:3000/api/hello',
  (_, res, ctx) => {
    return res(
      ctx.json({
        message: 'Hello World!',
      })
    );
  }
);
