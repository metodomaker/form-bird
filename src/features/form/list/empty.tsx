import * as React from 'react'
import Link from 'next/link'
import { FiInbox } from 'react-icons/fi'
import { Flex, Icon, Text, Button } from '@chakra-ui/react'

export default React.memo(function FormListEmpty() {
  return (
    <Flex
      w="full"
      color="gray.500"
      align="center"
      justify="center"
      flexDir="column"
    >
      <Icon as={FiInbox} mb={1} w={6} h={6} />
      <Text mb={1} fontWeight="bold">
        No Form Exist
      </Text>
      <Link href="/dashboard/forms/create">
        <Button size="sm">Create One</Button>
      </Link>
    </Flex>
  )
})
