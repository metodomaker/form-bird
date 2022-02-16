import { ServerResponse } from 'http'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'
import { MicroRequest } from 'apollo-server-micro/dist/types'

import prisma from '@/utils/prisma'

export interface Context {
  req: MicroRequest
  res: ServerResponse
  prisma: PrismaClient
  session: Session
}

const context = async ({ res, req }): Promise<Context> => {
  const session = await getSession({ req })
  return { prisma, session, res, req }
}

export default context
