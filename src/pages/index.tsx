import * as React from 'react'
import { Heading, Flex } from '@chakra-ui/react'

import CommonLayout from '@/layouts/common'

export default function Home() {
  return (
    <CommonLayout>
      <Flex h="500px" flexDir="column" align="center" justify="center">
        <Heading>Don't invest</Heading>
        <Heading>Just a random idea</Heading>
      </Flex>
    </CommonLayout>
  )
}
