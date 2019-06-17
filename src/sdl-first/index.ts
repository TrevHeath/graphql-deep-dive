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

  type Speaker {
    id: ID!
    name: String!
    title: String!
    company: String!
    hobbies: [Hobby]
  }

  enum Hobby {
    VIDEO_GAMES
    SPORTS
  }

  type Query {
    user(email: String!): User
    post(id: ID!): Post
    getSpeaker(id: ID!): Speaker
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
    },
    getSpeaker: async (root, { id }, context: Context, info) => {
      return await context.db.getSpeaker(id);
    }
  },
  User: {
    posts: async (parent, args, context: Context, info) => {
      return await context.db.getPostsByUser(parent.id);
    }
  },
  Post: {
    author: async (parent, args, context: Context, info) => {
      return await context.db.getUserByPost(parent.id);
    }
  },
  Speaker: {
    hobbies: async (parent, args, context: Context, info) => {
      return await context.db.getHobbiesBySpeaker(parent.id);
    }
  }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
