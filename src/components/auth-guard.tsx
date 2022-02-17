import * as React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const AuthGuard: React.FC = ({ children }) => {
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/')
    },
  })

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return <div>{children}</div>
}

export default AuthGuard
