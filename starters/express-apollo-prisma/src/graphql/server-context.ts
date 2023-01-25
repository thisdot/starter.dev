import { BaseContext } from '@apollo/server';

export type ServerContext = BaseContext & {
	// custom context properties
	token: string | undefined;
};
