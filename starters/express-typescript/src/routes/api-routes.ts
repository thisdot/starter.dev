import { Request, Response, Router } from 'express';

export const apiRouter = Router();

apiRouter.get('/hello', (req: Request, res: Response) => {
  console.log('hello form the other side');
  res.send('Hello!');
});
