const { AuthenticationError } = require('apollo-server-express');
const { User, Habit, LifeStyle } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    habits: async (parent, { lifeStyle }) => {
      const params = lifeStyle ? { lifeStyle } : {};
      return Habit.find(params).sort({ createdAt: -1 });
    },
    habit: async (parent, { habitId }) => {
      return Habit.findOne({ _id: habitId });
    },
  },
  Mutation: {
    addHabit: async (parent, { habitName }, context) => {
      if (context.user) {
        const habit = await Habit.create({
          habitName,
          timeLine,
          quantity,
        });
        return habit;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  removeHabit: async (parent, { habitId }, context) => {
    if (context.user) {
      const habit = await Habit.findOneAndDelete({
        _id: habitId,
      });

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { habits: habit._id } }
      );

      return habit;
    }
    throw new AuthenticationError('You need to be logged in!');
  },
}

module.exports = resolvers;
