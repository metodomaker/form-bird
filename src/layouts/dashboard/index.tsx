import * as React from 'react'
import { Box, Flex } from '@chakra-ui/react'

import Navbar from './navbar'

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <Flex flexDir="column" w="full" h="100vh">
      <Box flex="none" w="full" h="70px">
        <Navbar />
      </Box>
      <Box flex="auto" w="full" h="full" px={8} pt={8}>
        {children}
      </Box>
    </Flex>
  )
}
