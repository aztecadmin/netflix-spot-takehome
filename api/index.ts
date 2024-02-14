import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { resolvers, YelpAPI } from "./src/graphql/index.js";
import { ContextValue } from "./src/graphql/resolvers.js";

import dotenv from "dotenv";
dotenv.config();

const typeDefs = readFileSync("./src/graphql/schema.graphql", {
  encoding: "utf-8",
});

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => {
    const { cache } = server;
    return {
      dataSources: {
        yelpAPI: new YelpAPI({
          cache,
          token: `Bearer ${process.env.YELP_API_KEY}`,
        }),
      },
    };
  },
  listen: { port: 4000 },
});

console.log({ url });

console.log(`🚀  Server ready at: ${url}`);
