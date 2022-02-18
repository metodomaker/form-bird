import NextLink from 'next/link'
import { Heading, Text, LinkBox, LinkOverlay } from '@chakra-ui/react'
import * as React from 'react'

import DashboardLayout from '@/layouts/dashboard'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Heading mb={6}>Dashboard</Heading>

      <LinkBox
        p={4}
        rounded="md"
        border="1px"
        borderColor="gray.300"
        _hover={{ bg: 'gray.50' }}
      >
        <NextLink href={`/dashboard/forms`} passHref>
          <LinkOverlay>
            <Text fontWeight="semibold">Forms</Text>
          </LinkOverlay>
        </NextLink>
        <Text color="gray.500" fontSize="sm">
          List all forms
        </Text>
      </LinkBox>
    </DashboardLayout>
  )
}
