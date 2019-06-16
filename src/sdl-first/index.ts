import { gql, makeExecutableSchema } from "apollo-server";
import { IResolvers } from "./../../server-types";
import { Context } from "../utils/getContext";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    posts: [Post!]
  }
  type Post {
    id: ID!
    title: String!
    author: User!
  }

  type Query {
    user(email: String!): User
    post(id: ID!): Post
  }
`;

// Provide resolver functions for your schema fields
const resolvers: IResolvers = {
  Query: {
    user: async (root, { email }, context: Context, info) => {
      return await context.db.getUser(email);
    },
    post: async (root, { id }, context: Context, info) => {
      return await context.db.getPost(id);
    }
  },
  User: {
    posts: async (parent, args, context: Context, info) => {
      return await context.db.getPostsByUser(parent.id)
    }
  },
  Post: {
    author: async (parent, args, context: Context, info) => {
      return await context.db.getUserByPost(parent.id)
    }
  }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});