import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '@/utils/prisma'

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('Missing GOOGLE_CLIENT_ID')
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing GOOGLE_CLIENT_SECRET')
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error', // Error code passed in query string as ?error=
  },
})
