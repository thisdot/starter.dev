import { rest } from 'msw';

const greetingHandler = rest.get('https://api.starter.dev/.netlify/functions/server/hello', (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.text('Hi Learner')
  )
})

export default greetingHandler;
