import { objectType, stringArg, idArg } from 'nexus';

export const Query = objectType({
    name: "Query",
    definition(t) {
        t.field("user", {
            type: User,
            nullable: true,
            args: {
                email: stringArg({ required: true }),
            },
            resolve: async (parent, args, context, info) => {
                return await context.db.getUser("test@test.com");
            }
        })
        t.field("post", {
            type: Post,
            nullable: true,
            args: {
                id: idArg({ required: true }),
            },
            resolve: async (parent, args, context, info) => {
                return await context.db.getPost("234");
            }
        })
    }
})
export const User = objectType({
    name: "User",
    definition(t) {
        t.id("id")
        t.string("email")
        t.string("name", { nullable: true })
        t.list.field("posts", {
            type: Post,
            nullable: true,
            resolve: async (parent, args, context, info) => {
                return await context.db.getPostsByUser(parent.id);
            }
        })
    }
})
export const Post = objectType({
    name: "Post",
    definition(t) {
        t.id("id")
        t.string("title")
        t.field("author", {
            type: User,
            resolve: async (parent, args, context, info) => {
                return await context.db.getUserByPost(parent.id);
            }
        })
    }
})