import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// resolvers
import { resolvers } from "./resolvers/resolvers";

// types
import { typeDefs } from "./schema/schema";

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