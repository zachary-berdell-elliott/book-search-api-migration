const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).select('-__v-password');
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
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookData }, context ) => {
            console.log('Working');
            if (context.user) {
                const userBookData = await User.findByIdAndUpdate(
                    {  _id: context.user._id },
                    {
                        $push: {
                            savedBooks: bookData 
                        }
                    },
                    {
                        new: true
                    }
                )
                return userBookData;
            }
            throw new AuthenticationError('You must be logged in to save books.')
        },
        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(
                    { _id: context.user._id },
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