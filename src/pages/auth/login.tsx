import * as React from 'react'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { getProviders, signIn } from 'next-auth/react'

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const Login = ({ providers }: PageProps) => {
  const router = useRouter()

  React.useEffect(() => {
    if (router.query.callbackUrl) {
      router.replace(router.query.callbackUrl as string)
    }
  }, [])

  return (
    <>
      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: `${window.location.origin}/dashboard`,
              })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

export default Login
