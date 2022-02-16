import { DateTimeResolver } from 'graphql-scalars'

const resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    hello: () => 'Hello world!',
  },
  Mutation: {
    greeting: (_, { name }) => `Hello ${name}!`,
  },
}

export default resolvers
