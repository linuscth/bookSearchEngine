const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }
  type Book {
    _id: ID!
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }
  type Auth {
    token: ID!
    user: User
  }
input BookInput {
    authors: [String]
    description: String
    bookId: String!
    image: String
    link: String
    title: String
}
  type Query {
   Me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookinput: BookInput!): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;