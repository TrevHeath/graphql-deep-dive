import { objectType, stringArg, idArg } from "nexus";

// Code-first (also sometimes called resolver-first) is a
// process where the GraphQL schema is implemented programmatically and
// the SDL version of the schema is a generated artifact of that.
// This does not mean you shouldn't pay attention to schema design upfront!

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("user", {
      type: User,
      nullable: true,
      args: {
        email: stringArg({ required: true })
      },
      resolve: async (parent, args, context, info) => {
        return await context.db.getUser("test@test.com");
      }
    });
    t.field("post", {
      type: Post,
      nullable: true,
      args: {
        id: idArg({ required: true })
      },
      resolve: async (parent, args, context, info) => {
        return await context.db.getPost("234");
      }
    });
  }
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.string("email");
    t.string("name", { nullable: true });
    t.list.field("posts", {
      type: Post,
      nullable: true,
      resolve: async (parent, args, context, info) => {
        return await context.db.getPostsByUser(parent.id);
      }
    });
  }
});
export const Post = objectType({
  name: "Post",
  definition(t) {
    t.id("id");
    t.string("title");
    // t.boolean("published", { description: "Is the post currently live" });
    t.field("author", {
      type: User,
      resolve: async (parent, args, context, info) => {
        return await context.db.getUserByPost(parent.id);
      }
    });
  }
});
