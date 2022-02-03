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
    }
}

module.exports = resolvers;