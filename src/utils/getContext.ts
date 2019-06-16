import { User, Post } from "../../server-types";

export type Context = {
    db: {
        getUser: (email) => User;
        getUserByPost: (postId) => User;
        getPost: (id) => Post;
        getPostsByUser: (userId) => [Post];
    };
}

export default () => {
    return {
        db: mockDb
    } as Context;
}

const mockDb = {
    getUser: (email) => ({
        id: "123",
        email: email || "test@test.com",
        name: "Test"
    }),
    getUserByPost: (postId) => ({
        id: "123",
        email: "test@test.com",
        name: "Test"
    }),
    getPost: (id) => ({
        id: id || "234",
        title: "Post title"
    }),
    getPostsByUser: (userId) => ([{
        id: "234",
        title: "Post title"
    }]),
};