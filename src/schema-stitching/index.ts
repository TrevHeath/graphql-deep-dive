import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mergeSchemas
} from "graphql-tools";

//Who is familiar with monorepos, service-oriented architecture or micro-services?
// https://i.stack.imgur.com/BrnFy.png

//Schema stitching is a popular way to combine GraphQL schemas.  It was recently deprecated...

// Here is a representation of a Post Service
// makeRemoteExecutableSchema for server proxy

const postSchema = makeExecutableSchema({
  typeDefs: `
    type Post {
      id: ID!
      text: String
      authorId: ID!
    }

    type Query {
      postById(id: ID!): Post
      postsByAuthorId(authorId: ID!): [Post]
    }
  `
});

//Mocks as resolvers
addMockFunctionsToSchema({ schema: postSchema });

// Here is a representation of an author schema
// makeRemoteExecutableSchema for server proxy

const authorSchema = makeExecutableSchema({
  typeDefs: `
    type User {
      id: ID!
      email: String
    }

    type Query {
      userById(id: ID!): User
    }
  `
});

//Mocks as resolvers
addMockFunctionsToSchema({ schema: authorSchema });

const linkTypeDefs = `
  extend type User {
    posts: [Post]
  }

  extend type Post {
    author: User
  }
`;

// Representation of a Gateway
//Merging schemas and relying on schema delegation to call a remote schema and resolve.

export const schema = mergeSchemas({
  schemas: [postSchema, authorSchema, linkTypeDefs],
  resolvers: {
    User: {
      posts: {
        fragment: `... on User { id }`,
        resolve(user, args, context, info) {
          return info.mergeInfo.delegateToSchema({
            schema: postSchema,
            operation: "query",
            fieldName: "postsByAuthorId",
            args: {
              authorId: user.id
            },
            context,
            info
          });
        }
      }
    },
    Post: {
      author: {
        fragment: `... on Post { authorId }`,
        resolve(post, args, context, info) {
          return info.mergeInfo.delegateToSchema({
            schema: authorSchema,
            operation: "query",
            fieldName: "userById",
            args: {
              id: post.authorId
            },
            context,
            info
          });
        }
      }
    }
  }
});

//Disadvantages
// - Poor of separation of concerns
// - Tight coupling
// - Coordination
