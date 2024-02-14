import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // schema: "./schema.json",
  schema: "http://localhost:4000",
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "src/__generated__gql__/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
