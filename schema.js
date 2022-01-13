const { gql } = require("apollo-server");
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  #   Main Query builder ================================
  type Query {
    books: [Book]
  }

  # Create, Update, Delete ============================
  type Mutation {
    addBook(title: String!, image: String!): Book

    removeBook(id: ID): Boolean
  }
`;

module.exports = typeDefs;
