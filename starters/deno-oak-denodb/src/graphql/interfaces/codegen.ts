import { GraphQLResolveInfo } from '../../../deps.ts';
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

export type CreateTechnologyInput = {
	description: Scalars['String'];
	displayName: Scalars['String'];
	url: Scalars['String'];
};

export type Mutation = {
	__typename?: 'Mutation';
	createTechnology?: Maybe<Technology>;
	deleteTechnologyById: ResolveType;
	updateTechnology: ResolveType;
};

export type MutationCreateTechnologyArgs = {
	input: CreateTechnologyInput;
};

export type MutationDeleteTechnologyByIdArgs = {
	id: Scalars['String'];
};

export type MutationUpdateTechnologyArgs = {
	id: Scalars['String'];
	input: UpdateTechnologyInput;
};

export type Query = {
	__typename?: 'Query';
	getTechnologies: Array<Technology>;
	getTechnology?: Maybe<Technology>;
};

export type QueryGetTechnologyArgs = {
	id: Scalars['String'];
};

export type ResolveType = {
	__typename?: 'ResolveType';
	done?: Maybe<Scalars['Boolean']>;
};

export type Technology = {
	__typename?: 'Technology';
	createdAt: Scalars['String'];
	description: Scalars['String'];
	displayName: Scalars['String'];
	id: Scalars['String'];
	updatedAt: Scalars['String'];
	url: Scalars['String'];
};

export type UpdateTechnologyInput = {
	description?: InputMaybe<Scalars['String']>;
	displayName?: InputMaybe<Scalars['String']>;
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
	info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs,
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
	TArgs = {},
> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
	CreateTechnologyInput: CreateTechnologyInput;
	Mutation: ResolverTypeWrapper<{}>;
	Query: ResolverTypeWrapper<{}>;
	ResolveType: ResolverTypeWrapper<ResolveType>;
	String: ResolverTypeWrapper<Scalars['String']>;
	Technology: ResolverTypeWrapper<Technology>;
	UpdateTechnologyInput: UpdateTechnologyInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Boolean: Scalars['Boolean'];
	CreateTechnologyInput: CreateTechnologyInput;
	Mutation: {};
	Query: {};
	ResolveType: ResolveType;
	String: Scalars['String'];
	Technology: Technology;
	UpdateTechnologyInput: UpdateTechnologyInput;
};

export type MutationResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
	createTechnology?: Resolver<
		Maybe<ResolversTypes['Technology']>,
		ParentType,
		ContextType,
		RequireFields<MutationCreateTechnologyArgs, 'input'>
	>;
	deleteTechnologyById?: Resolver<
		ResolversTypes['ResolveType'],
		ParentType,
		ContextType,
		RequireFields<MutationDeleteTechnologyByIdArgs, 'id'>
	>;
	updateTechnology?: Resolver<
		ResolversTypes['ResolveType'],
		ParentType,
		ContextType,
		RequireFields<MutationUpdateTechnologyArgs, 'id' | 'input'>
	>;
};

export type QueryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
	getTechnologies?: Resolver<Array<ResolversTypes['Technology']>, ParentType, ContextType>;
	getTechnology?: Resolver<
		Maybe<ResolversTypes['Technology']>,
		ParentType,
		ContextType,
		RequireFields<QueryGetTechnologyArgs, 'id'>
	>;
};

export type ResolveTypeResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['ResolveType'] = ResolversParentTypes['ResolveType'],
> = {
	done?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TechnologyResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Technology'] = ResolversParentTypes['Technology'],
> = {
	createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
	Mutation?: MutationResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	ResolveType?: ResolveTypeResolvers<ContextType>;
	Technology?: TechnologyResolvers<ContextType>;
};
