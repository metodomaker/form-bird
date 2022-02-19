import { SessionProvider } from 'next-auth/react'
import { ChakraProvider, localStorageManager } from '@chakra-ui/react'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean
}

interface MyAppProps extends AppProps {
  Component: NextApplicationPage
}

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider colorModeManager={localStorageManager}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}
