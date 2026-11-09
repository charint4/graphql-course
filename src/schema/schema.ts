export const typeDefs = `#graphql
  type Game {
    _id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
  }

  type Review {
    _id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
    game_id: ID!
    author_id: ID!
  }

  type Author {
    _id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }

  type Query {
    reviews: [Review]
    review(id: ID!): Review
    games: [Game]
    game(id: ID!): Game
    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    addGame(game: AddGameInput!): Game
    deleteGame(id: ID!): [Game]
    updateGame(id: ID!, update: UpdateGameInput!): Game
  }

  input AddGameInput {
    title: String!
    platform: [String!]!
  }

  input UpdateGameInput {
    title: String
    platform: [String!]
  }
`;
