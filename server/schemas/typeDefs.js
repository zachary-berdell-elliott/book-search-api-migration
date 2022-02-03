const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID!
        authors: [Author]
        description: String!
        bookId: String!
        image: String!
        link: String!
        title: String!
    }
    type Author {
        _id: ID!
        name: String!
    }
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        books: [Book]
        book(title: String!): Book
        users: [User]
        user(username: String!): User
    }
    type Mutation {
        createUser(username: String!, email: String!, Password: String!)
    }`;

module.exports = typeDefs;