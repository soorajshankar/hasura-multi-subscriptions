/*** LINK ***/
import { graphql, print } from "graphql";
import { ApolloLink, Observable } from "@apollo/client";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { schema } from "./schema.js";

function delay(wait) {
  return new Promise((resolve) => setTimeout(resolve, wait));
}

const staticDataLink = new ApolloLink((operation) => {
  return new Observable(async (observer) => {
    const { query, operationName, variables } = operation;
    await delay(300);
    try {
      const result = await graphql({
        schema,
        source: print(query),
        variableValues: variables,
        operationName,
      });
      observer.next(result);
      observer.complete();
    } catch (err) {
      observer.error(err);
    }
  });
});

// const url = "wss://uifesi.sse.codesandbox.io/graphql";
const url = "ws://localhost:8080/v1/graphql"; // ws because localhost

const wsLink = new GraphQLWsLink(
  createClient({
    url,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret':'testpassword'
        // Authorization: `Bearer ${authToken}`
      }
   }
  })
);

const definitionIsSubscription = (d) => {
  return d.kind === "OperationDefinition" && d.operation === "subscription";
};

// Use directional composition in order to customize the terminating link
// based on operation type: a WebSocket for subscriptions and our own
// custom ApolloLink for everything else.
// For more information, see: https://www.apollographql.com/docs/react/api/link/introduction/#directional-composition
export const link = ApolloLink.split(
  (operation) => operation.query.definitions.some(definitionIsSubscription),
  wsLink,
  staticDataLink
);
