const { gql } = require('apollo-server-express');

const typeDefs = gql`
type habit {
    habitId: String!
    habitName: String!
    timeLine: String!
    quantity: Int!
  },
type query {
    habits(lifeStyle: String): [Habit]
    habit(habitId: ID!): Habit
    }
}
  type Mutation {
    addHabit(input: addHabitInput): lifeStyle
    removeHabit(habitId: String!): lifeStyle
`;

module.exports = typeDefs;
