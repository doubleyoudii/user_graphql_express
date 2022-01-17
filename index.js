const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
require("dotenv").config();

//connect to Mongo
require("./db/mongo")();
// connect to Mysql
require("./db/mysql")();

//mongo
const typeDefs = require("./typeDefs");
const Query = require("./resolvers/mongo/Query");
const Mutation = require("./resolvers/mongo/Mutation");
const { books } = require("./staticDB");
const User = require("./models/mongo/user.model");

const resolvers = {
  Query,
  Mutation,
};

const context = {
  books,
  User
};

async function startApolloServer() {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  const mongoServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  const mySQLServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
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
