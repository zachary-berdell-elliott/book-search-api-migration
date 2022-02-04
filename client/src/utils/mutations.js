import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }`;

export const ADD_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }`;

export const SAVE_BOOK = gql`
    mutation saveBook($userId: ID!, $bookId: ID!) {
        saveBook(userId: $userId, bookId: $bookId) {
            _id
            username
            email
            savedBooks 
        }
    }`;

export const REMOVE_BOOK = gql`
    mutation deleteBook($userId: ID!, $bookId: ID!) {
        deleteBook(userId: $userId, bookId: $bookId) {
            _id
            username
            email
            savedBooks
        }
    }`;