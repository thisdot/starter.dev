import { Cache } from '../../cache/cache.ts';

export interface TechnologyInput {
	displayName: string;
	description: string;
	url: string;
}

export interface GraphqlContext {
	cache: Cache;
}

export interface TechnologyArg {
	id: string;
	input?: TechnologyInput;
}
