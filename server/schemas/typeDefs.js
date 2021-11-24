const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type LifeStyle {
        _id: ID
        lifeStyleType: String!
        LifeStyleHabits: [LifeStyleHabit]
    }
    
    type LifeStyleHabit {
        _id: ID
        habitName: String
        frequency: Int
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
    type Query {
        me: [User]
        threads(username: String): [Thread]
        thread(threadId: ID!): Thread
        habits(lifeStyle: String): [Habit]
        habit(habitId: ID!): Habit
        lifeStyle(lifeStyleType: String!): LifeStyle
        lifeStyles: [LifeStyle]
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth    
        login(email: String!, password: String!): Auth
        addThread(threadText: String!): Thread
        addComment(threadId: ID!, commentText: String!): Thread
        removeThread(threadId: ID!): Thread
        removeComment(threadId: ID!, commentId: ID!): Thread
        addHabit(habitId: ID!, habitName: String!, frequency: Int!): Habit
        removeHabit(habitId: String!): Habit
    }
`;


module.exports = typeDefs;