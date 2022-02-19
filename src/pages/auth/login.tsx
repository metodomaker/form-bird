import * as React from 'react'
import { useRouter } from 'next/router'
import { getProviders, signIn } from 'next-auth/react'
import { Center, Button, VStack } from '@chakra-ui/react'

import type { InferGetServerSidePropsType } from 'next'

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const Login = ({ providers }: PageProps) => {
  const router = useRouter()

  const handleToHome = () => {
    router.push('/')
  }

  React.useEffect(() => {
    if (router.query.callbackUrl) {
      router.replace(router.query.callbackUrl as string)
    }
  }, [])

  return (
    <Center w="full" h="100vh">
      <VStack spacing={2}>
        {Object.values(providers).map(provider => (
          <div key={provider.name}>
            <Button
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: `${window.location.origin}/dashboard`,
                })
              }
            >
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
        <Button onClick={handleToHome}>Back to home page</Button>
      </VStack>
    </Center>
  )
}

export default Login
