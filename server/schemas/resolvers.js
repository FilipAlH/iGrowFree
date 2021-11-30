const { AuthenticationError } = require('apollo-server-express');
const { Quote, Thread, User, Habit, LifeStyle } = require('../models');

const { signToken } = require('../utils/auth');

const resolvers = {

  Query: {
    threads: async () => {
      return await Thread.find({}).populate('ThreadAuthor', 'username').sort({ createdAt: -1 });
    },

    thread: async (parent, { threadId }) => {
      return Thread.findOne({ _id: threadId }).populate('ThreadAuthor');
    },
    
    me: async () => {
      return await User.find({});
    },
    user: async (parent, { username }) => {
      const params = username ? { username } : {};
      // console.log(params)
      return await User.findOne(params);
    },
    habits: async (parent, { LifeStyle }) => {
      const params = LifeStyle ? { LifeStyle } : {};
      return Habit.find(params).sort({ createdAt: -1 });
    },
    habit: async (parent, { habitId }) => {
      return Habit.findOne({ _id: habitId });
    },

    lifeStyle: async (parent, { lifeStyleType }) => {
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
    addUser: async (parent, { username, email, userLifeStyle, password }) => {
      const newUser = await User.create({ username, email, userLifeStyle, password });
      const token = signToken(newUser);
      return { token, newUser };
      // return newUser;
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
    addThread: async (parent, { ThreadText, ThreadTitle}, context) => {

        const thread = await Thread.create({
          ThreadText,
          ThreadTitle,
          ThreadAuthor:context.user._id
        });

  const user=  await User.findByIdAndUpdate(
          { _id: context.user._id},
          { $push: { userThreads: thread._id } },
          {new:true}
        );
     
        return thread
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
    addHabit: async (parent, { habitName, frequency }) => {
      // if (context.user) {
      const habit = await Habit.create({
        habitName,
        frequency,
      });
      return habit;
      // }
      // throw new AuthenticationError('You need to be logged in!');
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




// romal - add login mutations back and remove coments on addUser to have auth workingm
//remove auth requirements

