import * as React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Flex, Text, Button } from '@chakra-ui/react'

export default React.memo(function Navbar() {
  const router = useRouter()
  const { status } = useSession()

  const handleNavigate = () => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    } else {
      router.push('/auth/login')
    }
  }

  return (
    <Flex
      as="nav"
      flex="none"
      w="full"
      h="70px"
      px={{ base: 1, sm: 2, md: 4 }}
      align="center"
      justify="space-between"
    >
      <Text fontWeight="bold">Form Bird</Text>

      <Button
        size="sm"
        onClick={handleNavigate}
        isLoading={status === 'loading'}
      >
        {status === 'authenticated' ? 'Dashboard' : 'Login'}
      </Button>
    </Flex>
  )
})
