const { AuthenticationError } = require('apollo-server-express');
const { Quote, Thread, User, Habit, LifeStyle } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    threads: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thread.find(params).sort({ createdAt: -1 });
    },

    thread: async (parent, { threadId }) => {
      return Thread.findOne({ _id: threadId });
    },

    me: async () => {
      return await User.find({});
    },
    habits: async (parent, { LifeStyle }) => {
      const params = LifeStyle ? { LifeStyle } : {};
      return Habit.find(params).sort({ createdAt: -1 });
    },
    habit: async (parent, { habitId }) => {
      return Habit.findOne({ _id: habitId });
    },

    lifeStyle: async (parent,  { lifeStyleType }) => {
      console.log(lifeStyleType)
      return await LifeStyle.findOne({ lifeStyleType: lifeStyleType });
    },

    lifeStyles: async () => {
      return await LifeStyle.find({})
    },

    quote: async (parent, { quoteId }) => {
      return Quote.findOne({ _id: quoteId });
      }
    },
  Mutation: {
    addUser: async (parent, args) => {
      const newUser = await User.create(args);
      const token = signToken(newUser);
      return { token, user: newUser };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('User Not Found');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Credentials does not match');
      }

      const token = signToken(user);

      return { token, user };
    },
    addThread: async (parent, { threadText }, context) => {
      if (context.user) {
        const thread = await Thread.create({
          threadText,
          threadAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { threads: thread._id } }
        );

        return thread;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { threadId, commentText }, context) => {
      if (context.user) {
        return Thread.findOneAndUpdate(
          { _id: threadId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeThread: async (parent, { threadId }, context) => {
      if (context.user) {
        const thread = await Thread.findOneAndDelete({
          _id: threadId,
          threadAuthor: context.user.username,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { threads: thread._id } }
        );

        return thread;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { threadId, commentId }, context) => {
      if (context.user) {
        return Thread.findOneAndUpdate(
          { _id: threadId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
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
  },
}
  

module.exports = resolvers;
