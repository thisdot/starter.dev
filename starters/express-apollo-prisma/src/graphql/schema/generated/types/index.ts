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

/** Pagination Information */
export type PageInformation = {
	__typename?: 'PageInformation';
	/** Last cursor in page */
	endCursor?: Maybe<Scalars['Int']>;
	/** Shows if there is a page after */
	hasNextPage: Scalars['Boolean'];
	/** Shows if there is a page before */
	hasPreviousPage: Scalars['Boolean'];
	/** First cursor in page */
	startCursor?: Maybe<Scalars['Int']>;
};

/** Technology queries */
export type Query = {
	__typename?: 'Query';
	/** Returns a list of Technologies */
	technologies: TechnologyCollection;
	/** Returns a single Technology by ID */
	technology?: Maybe<Technology>;
};

/** Technology queries */
export type QuerytechnologiesArgs = {
	after?: InputMaybe<Scalars['Int']>;
	first?: InputMaybe<Scalars['Int']>;
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

/** A collection of technologies */
export type TechnologyCollection = {
	__typename?: 'TechnologyCollection';
	/** A list of records of the requested page */
	edges: Array<Maybe<TechnologyNode>>;
	/** Pagination Information */
	pageInfo: PageInformation;
	/** Identifies the total count of technology records in data source */
	totalCount: Scalars['Int'];
};

/** Pagination Technology Node */
export type TechnologyNode = {
	__typename?: 'TechnologyNode';
	/** Current Cursor for Entity Node */
	cursor: Scalars['Int'];
	/** Technology Entity Node */
	node: Technology;
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
	PageInformation: ResolverTypeWrapper<PageInformation>;
	Query: ResolverTypeWrapper<{}>;
	String: ResolverTypeWrapper<Scalars['String']>;
	Technology: ResolverTypeWrapper<Technology>;
	TechnologyCollection: ResolverTypeWrapper<TechnologyCollection>;
	TechnologyNode: ResolverTypeWrapper<TechnologyNode>;
	UpdateTechnology: UpdateTechnology;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Boolean: Scalars['Boolean'];
	CreateTechnology: CreateTechnology;
	ID: Scalars['ID'];
	Int: Scalars['Int'];
	Mutation: {};
	PageInformation: PageInformation;
	Query: {};
	String: Scalars['String'];
	Technology: Technology;
	TechnologyCollection: TechnologyCollection;
	TechnologyNode: TechnologyNode;
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

export type PageInformationResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['PageInformation'] = ResolversParentTypes['PageInformation']
> = {
	endCursor?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	startCursor?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
	technologies?: Resolver<
		ResolversTypes['TechnologyCollection'],
		ParentType,
		ContextType,
		RequireFields<QuerytechnologiesArgs, 'first'>
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

export type TechnologyCollectionResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['TechnologyCollection'] = ResolversParentTypes['TechnologyCollection']
> = {
	edges?: Resolver<Array<Maybe<ResolversTypes['TechnologyNode']>>, ParentType, ContextType>;
	pageInfo?: Resolver<ResolversTypes['PageInformation'], ParentType, ContextType>;
	totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TechnologyNodeResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['TechnologyNode'] = ResolversParentTypes['TechnologyNode']
> = {
	cursor?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
	node?: Resolver<ResolversTypes['Technology'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
	Mutation?: MutationResolvers<ContextType>;
	PageInformation?: PageInformationResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	Technology?: TechnologyResolvers<ContextType>;
	TechnologyCollection?: TechnologyCollectionResolvers<ContextType>;
	TechnologyNode?: TechnologyNodeResolvers<ContextType>;
};
