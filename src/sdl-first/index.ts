import { gql, makeExecutableSchema } from "apollo-server";
import { IResolvers } from "./../../server-types";
import { Context } from "../utils/getContext";

// Construct a schema, using GraphQL Schema Definition Language

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

  input UserInput {
    email: String
    name: String
  }

  type Query {
    user(email: String!): User
    post(id: ID!): Post
    getSpeaker(id: ID!): Speaker
  }

  type Mutation {
    createUser(input: UserInput!): User
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
  Mutation: {
    createUser: async (root, args, context: Context, info) => {
      return await context.db.createUser(args.input);
    }
  },
  User: {
    // Trivial resolvers
    // name: async (parent, args, context: Context, info) => {
    //   return "Mr. Hijack";
    // },
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

//...But wait

// The process above known as SDL-first development

// SDL-first refers to the process of manually writing a GraphQL schema definition in GraphQL SDL
// followed by a separate implementation of the required resolver functions

// Advantages
//  - Easy to build
//  - Highlights schema design
//  - API documentation
//  - Great communication tool between frontend and backend teams
//  - Quick mocking of an API

// Disadvantages
//  - Inconsistencies between schema definition and resolvers
//  - Modularization of GraphQL schemas
//  - Redundancy in schema definitions (code reuse)
//  - IDE support & developer experience
//  - Composing GraphQL schemas

// Resource = https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3
