const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('books');
        },
        user: async (parent, { username }) => {
            return User.FindOne({ username }).populate('books');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('books');
              }
              throw new AuthenticationError('You have to log in first');
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
        },
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { userId, bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    {  _id: userId },
                    {
                        $addToSet: {
                            savedBooks: { bookId }
                        }
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                )
            }
            throw new AuthenticationError('You must be logged in to save books.')
        },
        deleteBook: async (parent, { userId, bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $pull: {
                            savedBooks: { bookId }
                        }
                    },
                    { new: true }
                )
            }
            throw new AuthenticationError('You have to be logged in to remove books.')
        }
    }
}

module.exports = resolvers;