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
	/** A brief description of the Technology */
	description?: InputMaybe<Scalars['String']>;
	/** Technology Name */
	displayName: Scalars['String'];
	/** The link to the Technology's documentation */
	url?: InputMaybe<Scalars['String']>;
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
export type MutationcreateTechnologyArgs = {
	input: CreateTechnology;
};

/** Technology mutations */
export type MutationdeleteTechnologyArgs = {
	id: Scalars['ID'];
};

/** Technology mutations */
export type MutationupdateTechnologyArgs = {
	id: Scalars['ID'];
	input: UpdateTechnology;
};

/** Technology queries */
export type Query = {
	__typename?: 'Query';
	/** Returns a list of Technologies */
	technologies: TechnologyCollectionPage;
	/** Returns a single Technology by ID */
	technology?: Maybe<Technology>;
};

/** Technology queries */
export type QuerytechnologiesArgs = {
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
};

/** Technology queries */
export type QuerytechnologyArgs = {
	id: Scalars['ID'];
};

/** Technology object */
export type Technology = {
	__typename?: 'Technology';
	/** A brief description of the Technology */
	description?: Maybe<Scalars['String']>;
	/** The name of the Technology */
	displayName: Scalars['String'];
	/** The ID of the Technology */
	id: Scalars['ID'];
	/** The link to the Technology's documentation */
	url?: Maybe<Scalars['String']>;
};

/** A page of technology items */
export type TechnologyCollectionPage = {
	__typename?: 'TechnologyCollectionPage';
	/** A list of records of the requested page */
	items: Array<Maybe<Technology>>;
	/** Identifies the total count of technology records in data source */
	totalCount: Scalars['Int'];
};

export type UpdateTechnology = {
	/** A brief description of the Technology */
	description?: InputMaybe<Scalars['String']>;
	/** Technology Name */
	displayName?: InputMaybe<Scalars['String']>;
	/** The link to the Technology's documentation */
	url?: InputMaybe<Scalars['String']>;
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
	Int: ResolverTypeWrapper<Scalars['Int']>;
	Mutation: ResolverTypeWrapper<{}>;
	Query: ResolverTypeWrapper<{}>;
	String: ResolverTypeWrapper<Scalars['String']>;
	Technology: ResolverTypeWrapper<Technology>;
	TechnologyCollectionPage: ResolverTypeWrapper<TechnologyCollectionPage>;
	UpdateTechnology: UpdateTechnology;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Boolean: Scalars['Boolean'];
	CreateTechnology: CreateTechnology;
	ID: Scalars['ID'];
	Int: Scalars['Int'];
	Mutation: {};
	Query: {};
	String: Scalars['String'];
	Technology: Technology;
	TechnologyCollectionPage: TechnologyCollectionPage;
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
		RequireFields<MutationcreateTechnologyArgs, 'input'>
	>;
	deleteTechnology?: Resolver<
		Maybe<ResolversTypes['Boolean']>,
		ParentType,
		ContextType,
		RequireFields<MutationdeleteTechnologyArgs, 'id'>
	>;
	updateTechnology?: Resolver<
		ResolversTypes['Technology'],
		ParentType,
		ContextType,
		RequireFields<MutationupdateTechnologyArgs, 'id' | 'input'>
	>;
};

export type QueryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
	technologies?: Resolver<
		ResolversTypes['TechnologyCollectionPage'],
		ParentType,
		ContextType,
		RequireFields<QuerytechnologiesArgs, 'limit' | 'offset'>
	>;
	technology?: Resolver<
		Maybe<ResolversTypes['Technology']>,
		ParentType,
		ContextType,
		RequireFields<QuerytechnologyArgs, 'id'>
	>;
};

export type TechnologyResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Technology'] = ResolversParentTypes['Technology']
> = {
	description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TechnologyCollectionPageResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['TechnologyCollectionPage'] = ResolversParentTypes['TechnologyCollectionPage']
> = {
	items?: Resolver<Array<Maybe<ResolversTypes['Technology']>>, ParentType, ContextType>;
	totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
	Mutation?: MutationResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	Technology?: TechnologyResolvers<ContextType>;
	TechnologyCollectionPage?: TechnologyCollectionPageResolvers<ContextType>;
};
