import { GraphQLClient } from "graphql-request";

import { getSdk } from "./codegen/swapi-types";

export function createClient() {
  const endpoint = "https://swapi-graphql.netlify.app/.netlify/functions/index";

  return getSdk(
    new GraphQLClient(endpoint, {
      headers: { "content-type": "application/json" },
    }),
  );
}

export const SwapiClient = createClient();
