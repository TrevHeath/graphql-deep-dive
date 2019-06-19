import { User, Post, Hobby, Speaker } from "../../server-types";

export type Context = {
  db: {
    getUser: (email) => User;
    createUser: (input) => User;
    getSpeaker: (email) => Speaker;
    getUserByPost: (postId) => User;
    getPost: (id) => Post;
    getPostsByUser: (userId) => [Post];
    getHobbiesBySpeaker: (userId) => [Hobby];
  };
};

export default () => {
  return {
    db: mockDb
  };
};

const mockDb = {
  createUser: input => ({
    id: "123",
    email: input.email || "test@test.com",
    name: input.name || "Bob Barker"
  }),
  getUser: email => ({
    id: "123",
    email: email || "test@test.com",
    name: "Bob Barker"
  }),
  getSpeaker: postId => ({
    id: "7",
    name: "Trevor Heath",
    title: "VP of Product Development",
    company: "Novvum"
  }),
  getUserByPost: postId => ({
    id: "123",
    email: "test@test.com",
    name: "Test"
  }),
  getPost: id => ({
    id: id || "234",
    title: "How to win Price is Right!"
  }),
  getPostsByUser: userId => [
    {
      id: "234",
      title: "How to win Price is Right!"
    }
  ],
  getHobbiesBySpeaker: userId => [Hobby.Sports, Hobby.VideoGames]
};
