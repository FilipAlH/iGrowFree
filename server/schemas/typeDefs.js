const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Thread {
        _id: ID
        threadText: String
        threadAuthor: String
        createdAt: String
        comments: [Comment]!
    }

    type Comment {
        _id: ID
        commentText: String
        commentAuthor: String
        createdAt: String
    }

    type Query {
        threads(username: String): [Thread]
        thread(threadId: ID!): Thread
        me: User
    }

    type Mutation {
        addThread(threadText: String!): Thread
        addComment(threadId: ID!, commentText: String!): Thread
        removeThread(threadId: ID!): Thread
        removeComment(threadId: ID!, commentId: ID!): Thread
      }
`;

module.exports = typeDefs;
