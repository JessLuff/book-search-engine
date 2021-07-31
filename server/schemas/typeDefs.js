const { gql } = require('apollo-server-express');

// MAKE AUTHORS ARRAY

const typeDefs = gql`

  type Query {
    me: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(description: String!, title: String!, bookId: ID!, image: String!, link: String!): User
    removeBook(booktId: ID!): Book
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [bookSchema]
  }

  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;


