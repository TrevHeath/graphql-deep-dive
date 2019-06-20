![alt text](https://marmelab.com/images/blog/graphql/logo.png)

## GraphQL Server Deep Dive

Today we will dive into the basic parts of a GraphQL server implementation and some of the key trends and decisions teams need to make when building complex GraphQL APIs.

### **The Building Blocks of a GraphQL**

- **Schema** 📃
  <br/>
  A type system defined for your data. This acts as a contract for
  <br/>
  <br/>
- **Resolvers** 🚜
  <br/>
  A set of functions defined for each type. These functions are called when types are requested and validated against the schema.
  <br/>
  <br/>

### **Managing Complex Schemas**

1. A dive into SDL-first and Code-first development.

- SDL-first example
- Code-first example with GraphQL Nexus

2. A quick look at how to manage a microservice or service oriented architecture

- Schema Stitching
- Apollo Federation example
