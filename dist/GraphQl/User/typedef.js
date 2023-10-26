"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
  type User{
    id:ID!
    firstName:String!
    lastName:String
    email:String!
    profileImageURL:String   
    posts: Post
}

type Post {
  id: String!
  title: String!
  content: String!
  postImages: PostImage
  published: Boolean!
  author: User!
}

type PostImage {
  id: String!
  url: String!
  post: Post!
}
`;
