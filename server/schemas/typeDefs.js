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
        ThreadTitle: String!
        ThreadText: String!
        ThreadAuthor: User
        createdAt: String
        comments: [Comment]
    }

    type Comment {
        _id: ID
        commentText: String
        commentAuthor: String
        createdAt: String
    }

    type checkListHabits{
        Name: String!
        State: [[Int!]]
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        userLifeStyle: String
        userThreads: [Thread]
        userHabits: [Habit]
        checkListHabits: [checkListHabits]
    }
    
    type Auth {
        token: ID!
        user: User
    } 
    type Quote {
        _id: ID
        description: String
        author: String
    }       
    type Query {
        me: [User]
        user(username: String!): User
        threads: [Thread]
        thread(threadId: ID!): Thread
        habits: [Habit]
        habit(habitId: ID!): Habit
        lifeStyle(lifeStyleType: String!): LifeStyle
        lifeStyles: [LifeStyle]
        quote(quoteId: ID!): Quote
        quotes: [Quote]
    }
    type Mutation {
        addUser(username: String!, email: String!, userLifeStyle: String! password: String!): Auth 
        login(email: String!, password: String!): Auth
        addThread(threadText: String!, threadTitle: String!): Thread
        addComment(threadId: ID!, commentText: String!): Thread
        removeThread(threadId: ID!): Thread
        removeComment(threadId: ID!, commentId: ID!): Thread
        addHabit(habitName: String!, frequency: Int!): Habit
        removeHabit(habitId: String!): Habit
        updateUser(username: String!, habit: String!, state: [[Int!]]): User
    }
`;


module.exports = typeDefs;

// romal - add auth to addUser mutations