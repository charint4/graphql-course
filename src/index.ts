import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

// resolvers
import { resolvers } from "./resolvers/resolvers";

// types
import { typeDefs } from "./schema/schema";

// database connection
import { connectDB } from "./db";

const app = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {
  await connectDB();

  const server = new ApolloServer({
    // type definitions is like schema
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  const PORT = Number(process.env.PORT);

  app.listen(PORT, () => {
    console.log(`🚀 GraphQL server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});