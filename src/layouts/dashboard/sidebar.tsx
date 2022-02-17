import { useSession } from 'next-auth/react'
import { VStack, Text, Button } from '@chakra-ui/react'

export default function DashboardSidebar() {
  const { status } = useSession()

  return (
    <VStack w="full" h="full" spacing={2}>
      <Text>{status}</Text>

      <Button>All Forms</Button>
    </VStack>
  )
}
