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
    game(_: any, args: { id: string }) {
      return db.games.find((game) => game.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_: any, args: { id: string }) {
      return db.reviews.find((review) => review.id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(_: any, args: { id: string }) {
      return db.authors.find((author) => author.id === args.id);
    }
  },
  Game : {
    reviews(parent: any) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    }
  },
  Author: {
    reviews(parent: any) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    }
  },
  Review: {
    author(parent: any) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
    game(parent: any) {
      return db.games.find((game) => game.id === parent.game_id);
    }
  },
  Mutation: {
    deleteGame(_: any, args: { id: string }) {
      db.games = db.games.filter((game) => game.id !== args.id);

      return db.games;
    },
    addGame(_: any, args: { game: { title: string; platform: string[] } }) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 100000).toString(),
      }

      db.games.push(game);
      
      return game;
    },
    updateGame(_: any, args: { id: string, update: { title?: string, platform?: string[] } }) {
      db.games = db.games.map((game) => {
        if(game.id === args.id) {
          return {
            ...game,
            ...args.update
          }
        }

        return game
      })

      return db.games.find((game) => game.id === args.id);
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