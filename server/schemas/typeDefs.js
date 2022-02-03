const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID!
        authors: [String!]
        description: String!
        bookId: String!
        image: String!
        link: String!
        title: String!
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
        me: User
    }
    type Mutation {
        createUser(username: String!, email: String!, Password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(userId: ID!, bookId: ID!): User
        deleteBook(userId: ID!, bookId: ID!): User
    }`;

module.exports = typeDefs;