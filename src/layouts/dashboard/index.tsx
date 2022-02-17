import * as React from 'react'
import { Box, Flex } from '@chakra-ui/react'

import DashboardSidebar from './sidebar'

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <Flex w="full" h="100vh">
      <Box flex="none" w="250px">
        <DashboardSidebar />
      </Box>
      <Box flex="auto" w="full" h="full" px={4} pt={6}>
        {children}
      </Box>
    </Flex>
  )
}
