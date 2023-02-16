import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

export type CreateTechnology = {
	description: Scalars['String'];
	/** Technology Display Name */
	displayName: Scalars['String'];
	url: Scalars['String'];
};

/** Technology mutations */
export type Mutation = {
	__typename?: 'Mutation';
	/** Creates a new Technology */
	createTechnology: Technology;
	/** Removes a Technology */
	deleteTechnology?: Maybe<Scalars['Boolean']>;
	/** Updates a Technology */
	updateTechnology: Technology;
};

/** Technology mutations */
export type MutationCreateTechnologyArgs = {
	input: CreateTechnology;
};

/** Technology mutations */
export type MutationDeleteTechnologyArgs = {
	id: Scalars['ID'];
};

/** Technology mutations */
export type MutationUpdateTechnologyArgs = {
	id: Scalars['ID'];
	input: UpdateTechnology;
};

export type Query = {
	__typename?: 'Query';
	/** Simple hello world query that accepts a greeting */
	hello: Scalars['String'];
	/** Returns a list of Technologies */
	technologies: Array<Maybe<Technology>>;
	/** Returns a single Technology by ID */
	technology?: Maybe<Technology>;
};

export type QueryHelloArgs = {
	greeting: Scalars['String'];
};

export type QueryTechnologyArgs = {
	id: Scalars['ID'];
};

/** Technology object */
export type Technology = {
	__typename?: 'Technology';
	/** The brief description of the Technology */
	description: Scalars['String'];
	/** The display name of the Technology */
	displayName: Scalars['String'];
	/** The ID of the Technology */
	id: Scalars['ID'];
	/** The link to the Technology's documentation */
	url: Scalars['String'];
};

export type UpdateTechnology = {
	description: Scalars['String'];
	/** Technology Display Name */
	displayName: Scalars['String'];
	url: Scalars['String'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> {
	subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
	resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
	TResult,
	TKey extends string,
	TParent = {},
	TContext = {},
	TArgs = {}
> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
	CreateTechnology: CreateTechnology;
	ID: ResolverTypeWrapper<Scalars['ID']>;
	Mutation: ResolverTypeWrapper<{}>;
	Query: ResolverTypeWrapper<{}>;
	String: ResolverTypeWrapper<Scalars['String']>;
	Technology: ResolverTypeWrapper<Technology>;
	UpdateTechnology: UpdateTechnology;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Boolean: Scalars['Boolean'];
	CreateTechnology: CreateTechnology;
	ID: Scalars['ID'];
	Mutation: {};
	Query: {};
	String: Scalars['String'];
	Technology: Technology;
	UpdateTechnology: UpdateTechnology;
};

export type MutationResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
	createTechnology?: Resolver<
		ResolversTypes['Technology'],
		ParentType,
		ContextType,
		RequireFields<MutationCreateTechnologyArgs, 'input'>
	>;
	deleteTechnology?: Resolver<
		Maybe<ResolversTypes['Boolean']>,
		ParentType,
		ContextType,
		RequireFields<MutationDeleteTechnologyArgs, 'id'>
	>;
	updateTechnology?: Resolver<
		ResolversTypes['Technology'],
		ParentType,
		ContextType,
		RequireFields<MutationUpdateTechnologyArgs, 'id' | 'input'>
	>;
};

export type QueryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
	hello?: Resolver<
		ResolversTypes['String'],
		ParentType,
		ContextType,
		RequireFields<QueryHelloArgs, 'greeting'>
	>;
	technologies?: Resolver<Array<Maybe<ResolversTypes['Technology']>>, ParentType, ContextType>;
	technology?: Resolver<
		Maybe<ResolversTypes['Technology']>,
		ParentType,
		ContextType,
		RequireFields<QueryTechnologyArgs, 'id'>
	>;
};

export type TechnologyResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Technology'] = ResolversParentTypes['Technology']
> = {
	description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
	Mutation?: MutationResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	Technology?: TechnologyResolvers<ContextType>;
};
