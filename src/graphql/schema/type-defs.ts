import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  scalar DateTime

  type Query {
    hello: String
  }

  type Mutation {
    greeting(name: String!): String!
  }
`

export default typeDefs
