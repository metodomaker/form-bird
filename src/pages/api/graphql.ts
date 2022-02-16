import Cors from 'micro-cors'
import { ApolloServer } from 'apollo-server-micro'
import { applyMiddleware } from 'graphql-middleware'

import type { PageConfig } from 'next'

import schema from '@/graphql/schema'
import context from '@/graphql/context'
import permissions from '@/graphql/permissions'

const cors = Cors()

const apolloServer = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context,
})

const startServer = apolloServer.start()

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export default cors(handler)
