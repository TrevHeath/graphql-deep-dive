import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mergeSchemas
} from "graphql-tools";

// Mocked post schema
// Imagine as separate services
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

addMockFunctionsToSchema({ schema: postSchema });

// Mocked author schema
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

const linkTypeDefs = `
  extend type User {
    posts: [Post]
  }

  extend type Post {
    author: User
  }
`;

addMockFunctionsToSchema({ schema: authorSchema });

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
