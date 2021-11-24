const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type LifeStyle {
        _id: ID
        LifeStyleType: String!
        LifeStyleHabits: [Habit]
    }

    type Habit {
        _id: ID!
        habitName: String!
        frequency: Int!
        createdAt: String
    }
    
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

    type User {
        _id: ID
        username: String
        email: String
    }
    type Auth {
        token: ID
        user: User
    } 
    type Quote {
        _id: ID
        description: String
        author: String
    }       
    type Query {
        me: [User]
        threads(username: String): [Thread]
        thread(threadId: ID!): Thread
        habits(lifeStyle: String): [Habit]
        habit(habitId: ID!): Habit
        lifeStyle(LifeStyleType: String!): LifeStyle
        lifeStyles: [LifeStyle]
        quote(quoteId: ID!): Quote
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth    
        login(email: String!, password: String!): Auth
        addThread(threadText: String!): Thread
        addComment(threadId: ID!, commentText: String!): Thread
        removeThread(threadId: ID!): Thread
        removeComment(threadId: ID!, commentId: ID!): Thread
        addHabit(habitId: ID!, habitName: String!, frequency: Int!): lifeStyle
        removeHabit(habitId: String!): lifeStyle
    }
`;


module.exports = typeDefs;