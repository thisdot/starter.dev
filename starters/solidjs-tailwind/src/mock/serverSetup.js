import { setupServer } from 'msw/node';
import greetingHandler from './greetingHandler';

const server = setupServer(greetingHandler);

export { server };
