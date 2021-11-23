const { AuthenticationError } = require('apollo-server-express');
const { Comment, Thread } = require('../models');
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
  },
  
  Mutation: {
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
  }
}
module.exports = resolvers;
