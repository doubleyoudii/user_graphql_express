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
const typeDefs = require("./typeDefs");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const { books } = require("./staticDB");

const resolvers = {
  Query,
  Mutation,
};

const context = {
  books,
};

async function startApolloServer() {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  const mongoServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer, context })],
  });

  const mySQLServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer, context })],
  });

  //MONGO GRAPHQL
  await mongoServer.start();
  mongoServer.applyMiddleware({
    app,
    path: "/graphql-mongo",
  });

  //MONGO GRAPHQL
  await mySQLServer.start();
  mySQLServer.applyMiddleware({
    app,
    path: "/graphql-mysql",
  });

  app.use((req, res) => {
    res.send("Hello to the other side");
  });

  // Modified server startup
  httpServer.listen(4000, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${mongoServer.graphqlPath}`
    );
  });
}

startApolloServer();
