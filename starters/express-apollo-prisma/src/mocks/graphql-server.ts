import { ExpressMiddlewareOptions } from '@apollo/server/dist/esm/express4';
import { WithRequired } from '@apollo/utils.withrequired';
import { RequestHandler } from 'express';
import { mock, MockProxy } from 'jest-mock-extended';
import { ServerContext } from '../graphql/server-context';

export const createMockExpressMiddlewareOptions = (): MockProxy<
	WithRequired<ExpressMiddlewareOptions<ServerContext>, 'context'>
> => mock<WithRequired<ExpressMiddlewareOptions<ServerContext>, 'context'>>();
