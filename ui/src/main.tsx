import React from "react";
import ReactDOM from "react-dom/client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App.tsx";
import "./index.css";

const APOLLO_CLIENT_URL = import.meta.env.VITE_APOLLO_CLIENT_URL;
if (!APOLLO_CLIENT_URL) throw new Error("Apollo client url must be provided");

const client = new ApolloClient({
  uri: APOLLO_CLIENT_URL,
  cache: new InMemoryCache({}),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
