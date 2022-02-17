import { getSession } from 'next-auth/react'
import { NextApiRequest, NextApiResponse } from 'next'

import prisma from './prisma'

export async function useUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req })
    if (session && session.user) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      })
      return user
    }
    return null
  } catch (error) {
    return null
  }
}
