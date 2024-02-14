import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { resolvers, YelpAPI } from "./src/graphql/index.js";
import { ContextValue } from "./src/graphql/resolvers.js";

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
          // TODO: Extract this to env variable
          token:
            "Bearer B6vnjJXNjHKEkNbCjB1JegizzLe2H0hKBejFaiC_x5BuYfVVeitgNVy1WsxYeUp_NcYte-BZJKro4rHdh3BJreao4ZFoqa96FG_b9HK4qscwGWqLIiL0k08yOfDLZXYx",
        }),
      },
    };
  },
  listen: { port: 4000 },
});

console.log({ url });

console.log(`🚀  Server ready at: ${url}`);
