import { graphql } from 'msw';

export const helloMock = graphql.query(
  'http://localhost:3000/graphql/',
  (_, res, ctx) => {
    return res(
      ctx.data({
        hello: 'Hello World!',
      })
    );
  }
);
