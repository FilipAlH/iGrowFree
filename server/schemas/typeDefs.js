const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type LifeStyle {
        _id: ID
        LifeStyleType: String!
        LifeStyleHabits: [Habit]
    }

    type habit {
    habitId: String!
    habitName: String!
    timeLine: String!
    quantity: Int!
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
        lifeStyle(LifeStyleType: String!): LifeStyle
        lifeStyles: [LifeStyle]
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth    
        login(email: String!, password: String!): Auth
        addThread(threadText: String!): Thread
        addComment(threadId: ID!, commentText: String!): Thread
        removeThread(threadId: ID!): Thread
        removeComment(threadId: ID!, commentId: ID!): Thread
        addHabit(input: addHabitInput): lifeStyle
        removeHabit(habitId: String!): lifeStyle
    }
`;


module.exports = typeDefs;