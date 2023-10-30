"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#graphql
getUserToken(email:String!,password:String!):String
getCurrentUserLoggedInUser:User
getPostInfo(id:String!):String
`;
