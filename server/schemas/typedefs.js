const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book{
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
    }
    type User{
    _id: ID 
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
    }
    type Auth{
    token: ID!
    user: User
    }
    type Query{
    me: User
    users: [User]
    }
    type Muation{
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String], description: String, title: String, bookId: String, image: String, link: String): User
    deleteBook(bookId: String): User
    }
`;

module.exports = typeDefs;