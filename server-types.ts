import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum Hobby {
  VideoGames = "VIDEO_GAMES",
  Sports = "SPORTS"
}

export type Post = {
  __typename?: "Post";
  id: Scalars["ID"];
  title: Scalars["String"];
  author: User;
};

export type Query = {
  __typename?: "Query";
  user?: Maybe<User>;
  post?: Maybe<Post>;
  getSpeaker?: Maybe<Speaker>;
};

export type QueryUserArgs = {
  email: Scalars["String"];
};

export type QueryPostArgs = {
  id: Scalars["ID"];
};

export type QueryGetSpeakerArgs = {
  id: Scalars["ID"];
};

export type Speaker = {
  __typename?: "Speaker";
  id: Scalars["ID"];
  name: Scalars["String"];
  title: Scalars["String"];
  company: Scalars["String"];
  hobbies?: Maybe<Array<Maybe<Hobby>>>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  posts?: Maybe<Array<Post>>;
};
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: {};
  String: Scalars["String"];
  User: User;
  ID: Scalars["ID"];
  Post: Post;
  Speaker: Speaker;
  Hobby: Hobby;
  Boolean: Scalars["Boolean"];
}>;

export type PostResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Post"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  author?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Query"]
> = ResolversObject<{
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    QueryUserArgs
  >;
  post?: Resolver<
    Maybe<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    QueryPostArgs
  >;
  getSpeaker?: Resolver<
    Maybe<ResolversTypes["Speaker"]>,
    ParentType,
    ContextType,
    QueryGetSpeakerArgs
  >;
}>;

export type SpeakerResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Speaker"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  company?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  hobbies?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Hobby"]>>>,
    ParentType,
    ContextType
  >;
}>;

export type UserResolvers<
  ContextType = any,
  ParentType = ResolversTypes["User"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  posts?: Resolver<
    Maybe<Array<ResolversTypes["Post"]>>,
    ParentType,
    ContextType
  >;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Speaker?: SpeakerResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
