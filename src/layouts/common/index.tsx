import * as React from 'react'
import { Box, Flex } from '@chakra-ui/react'

import Navbar from './navbar'
import Footer from './footer'

interface Props {
  children: React.ReactNode
}

export default function CommonLayout({ children }: Props) {
  return (
    <Flex w="full" minH="100vh" flexDir="column">
      <Navbar />
      <Box flex="auto" w="full" h="full">
        {children}
      </Box>
      <Footer />
    </Flex>
  )
}
