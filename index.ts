import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// db
import db from "./_db";

// types
import { typeDefs } from "./schema";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
    review(_: any, args: { id: string }) {
      return db.reviews.find((review) => review.id === args.id);
    },
    game(_: any, args: { id: string }) {
      return db.games.find((game) => game.id === args.id);
    },
    author(_: any, args: { id: string }) {
      return db.authors.find((author) => author.id === args.id);
    }
  }
}

// server setup
const server = new ApolloServer({
  // type definitions is like schema
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);