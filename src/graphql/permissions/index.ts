import { shield } from 'graphql-shield'

import { isPublic, isAuthenticated } from './rules'

const permissions = shield({
  Query: {
    '*': isAuthenticated,
    hello: isPublic,
  },
  Mutation: {
    '*': isAuthenticated,
  },
})

export default permissions
