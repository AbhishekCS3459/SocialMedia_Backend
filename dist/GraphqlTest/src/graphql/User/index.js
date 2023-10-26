"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const queries_1 = require("./queries");
const mutation_1 = require("./mutation");
const resolvers_1 = require("./resolvers");
const typedef_1 = require("./typedef");
exports.User = {
    typeDefs: typedef_1.typeDefs,
    queries: queries_1.query,
    mutations: mutation_1.mutations,
    resolvers: resolvers_1.resolvers,
};
