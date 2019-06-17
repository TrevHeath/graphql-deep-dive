import { ApolloServer } from "apollo-server";
// import { schema } from "./sdl-first";
// import { schema } from "./code-first";
import { schema } from "./schema-stitching";
import getContext from "./utils/getContext";

import { ApolloGateway } from "@apollo/gateway";

//Standard GraphQL Server..

const apolloServer = new ApolloServer({
  schema,
  context: getContext
});

apolloServer.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

//Schema Federation

// const gateway = new ApolloGateway({
//   serviceList: [
//     { name: "accounts", url: "https://pw678w138q.sse.codesandbox.io/graphql" },
//     { name: "reviews", url: "https://0yo165yq9v.sse.codesandbox.io/graphql" },
//     { name: "products", url: "https://x7jn4y20pp.sse.codesandbox.io/graphql" },
//     { name: "inventory", url: "https://o5oxqmn7j9.sse.codesandbox.io/graphql" }
//   ]
// });

// (async () => {
//   const { schema, executor } = await gateway.load();

//   const server = new ApolloServer({ schema, executor });

//   server.listen().then(({ url }) => {
//     console.log(`🚀 Server ready at ${url}`);
//   });
// })();
