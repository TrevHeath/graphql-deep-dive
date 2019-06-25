<img src="https://marmelab.com/images/blog/graphql/logo.png" width="250px"/>

## **GraphQL Server Deep Dive**

This repo dives into the basic parts of a GraphQL server implementation. It also provides examples of a few tools and conventions that are important for teams to be aware of when building complex GraphQL APIs.



### **The Building Blocks of a GraphQL API**

- **Schema** 📃
  
  A type system defined for your data. This acts as a contract for
  

- **Resolvers** 🚜
  
  A set of functions defined for each type. These functions are called when types are requested and validated against the schema.
  

### **Execution**

Provided by the folks at Thoughtbot, this diagram explains the lifecycle of a GraphQL request and server response.

<img src="https://images.thoughtbot.com/blog-vellum-image-uploads/OZs0udDSRGCmxhbRyotJ_graphql.png" width="400px"/>



### **Managing Complex Schemas**

1. A dive into SDL-first and Code-first development.

- SDL-first example
- Code-first example with GraphQL Nexus

2. A quick look at how to manage a microservice or service oriented architecture

- Schema Stitching
- Apollo Federation example



## Getting started

1. Change `index.ts` file to point at your preferred schema object.  Comment out other schema imports. Or comment out `apolloServer` and uncomment `gateway` to explore [Schema Federation](https://www.apollographql.com/docs/apollo-server/federation/federation-spec/)

2. Run `yarn && yarn start` in root

3. Go to http://localhost:4000 to query Playground