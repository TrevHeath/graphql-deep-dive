import { ApolloServer } from "apollo-server";
import { schema } from "./sdl-first";
import getContext from "./utils/getContext";

const apolloServer = new ApolloServer({
  schema,
  context: getContext,
});

apolloServer.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
