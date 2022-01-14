const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
require("dotenv").config();

//connect to Mongo
require("./db/mongo")()

// connect to Mysql
require("./db/mysql")();
//mongo
const typeDefs = require("./schema");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const { books } = require("./db");

const resolvers = {
  Query,
  Mutation,
};

const context = {
  books,
};

async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer, context })],
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  app.use((req, res) => {
    res.send("Hello to the other side");
  });

  // Modified server startup
  httpServer.listen(4000, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
}

startApolloServer(typeDefs, resolvers);
