const { gql } = require("apollo-server-express");
const typeDefs = gql`

  input UserInput {
    name: String!, email: String!, password: String!
  }
  # Inputs ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  type Book {
    title: String
    author: String
  }

  type User {
    name: String
    email: String
    password: String
  }

  #   Main Query builder ================================
  type Query {
    books: [Book]
    users: [User]
  }

  # Create, Update, Delete ============================
  type Mutation {
    addBook(title: String!, image: String!): Book
    removeBook(id: ID): Boolean

    signup (user: UserInput): User
  }
`;

module.exports = typeDefs;
