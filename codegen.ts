import type { CodegenConfig } from "@graphql-codegen/cli";

const SWAPI_API_URL = `https://swapi-graphql.netlify.app/.netlify/functions/index`;

const config = {
  overwrite: true,
  schema: {
    [SWAPI_API_URL]: {
      headers: {
        "content-type": "application/json",
      },
      assumeValid: true,
    },
  },
  config: {
    namingConvention: {
      enumValues: "keep", // Preserve the enum values as-is
    },
    enumsAsTypes: true,
  },
  documents: ["./src/**/*.ts"],
  generates: {
    "./src/codegen/swapi-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
} satisfies CodegenConfig;

export default config;
