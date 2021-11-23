const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      const userData = await User.findOne({ _id: context.user._id }).populate('savedBooks');
      return userData;
    },
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
  },
}
module.exports = resolvers;
