import { GraphQLResolveInfo } from '../../../deps.ts';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTechnology: Maybe<Technology>;
  deleteTechnologyById: ResolveType;
  updateTechnology: ResolveType;
};


export type MutationCreateTechnologyArgs = {
  technology: InputMaybe<TechnologyInput>;
};


export type MutationDeleteTechnologyByIdArgs = {
  id: InputMaybe<Scalars['String']>;
};


export type MutationUpdateTechnologyArgs = {
  id: InputMaybe<Scalars['String']>;
  input: InputMaybe<TechnologyInput>;
};

export type Query = {
  __typename?: 'Query';
  getTechnologies: Maybe<Array<Technology>>;
  getTechnology: Maybe<Technology>;
};


export type QueryGetTechnologyArgs = {
  id: InputMaybe<Scalars['String']>;
};

export type ResolveType = {
  __typename?: 'ResolveType';
  done: Maybe<Scalars['Boolean']>;
};

export type Technology = {
  __typename?: 'Technology';
  createdAt: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  displayName: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};

export type TechnologyInput = {
  description: InputMaybe<Scalars['String']>;
  displayName: InputMaybe<Scalars['String']>;
  url: InputMaybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
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

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ResolveType: ResolverTypeWrapper<ResolveType>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Technology: ResolverTypeWrapper<Technology>;
  TechnologyInput: TechnologyInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Mutation: {};
  Query: {};
  ResolveType: ResolveType;
  String: Scalars['String'];
  Technology: Technology;
  TechnologyInput: TechnologyInput;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createTechnology: Resolver<Maybe<ResolversTypes['Technology']>, ParentType, ContextType, Partial<MutationCreateTechnologyArgs>>;
  deleteTechnologyById: Resolver<ResolversTypes['ResolveType'], ParentType, ContextType, Partial<MutationDeleteTechnologyByIdArgs>>;
  updateTechnology: Resolver<ResolversTypes['ResolveType'], ParentType, ContextType, Partial<MutationUpdateTechnologyArgs>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getTechnologies: Resolver<Maybe<Array<ResolversTypes['Technology']>>, ParentType, ContextType>;
  getTechnology: Resolver<Maybe<ResolversTypes['Technology']>, ParentType, ContextType, Partial<QueryGetTechnologyArgs>>;
};

export type ResolveTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResolveType'] = ResolversParentTypes['ResolveType']> = {
  done: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TechnologyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Technology'] = ResolversParentTypes['Technology']> = {
  createdAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation: MutationResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  ResolveType: ResolveTypeResolvers<ContextType>;
  Technology: TechnologyResolvers<ContextType>;
};

