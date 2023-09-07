import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
}`
export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
} `
export const SAVE_BOOK = gql`
mutation saveBook($BookInput: BookInput!) {
    saveBook(BookInput: $BookInput) {
        _id
        username
        email
        savedBook {
            _id
            authors
            description
            bookId
            image
            link
            title
        }
    }
} `
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
        username
        email
        savedBooks {
            _id
            authors
            description
            bookId
            image
            link
            title
        }
    }
}`
