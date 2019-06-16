import * as types from './types';
import { makeSchema } from 'nexus';
var path = require("path");

export const schema = makeSchema({
  types: Object.values(types),
  outputs: {
    schema: __dirname + "/generated/schema.graphql",
    typegen: __dirname + "/generated/typings.ts"
  },
  typegenAutoConfig: {
    sources: [{
      alias: "getContext",
      source: path.join(__dirname, "../utils/getContext.ts")
    }],
    contextType: "getContext.Context"
  }
});
