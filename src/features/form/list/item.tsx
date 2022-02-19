import * as React from 'react'
import NextLink from 'next/link'
import { format } from 'date-fns'
import { Flex, Text, LinkBox, LinkOverlay } from '@chakra-ui/react'

import type { SerializedForm } from '@/types'

interface Props {
  data: SerializedForm
}

export default React.memo(function FormListItem({ data }: Props) {
  return (
    <LinkBox
      as={Flex}
      w="full"
      h="60px"
      flexDir="column"
      justify="space-between"
      textDecoration="none"
      py={2}
      px={4}
      _hover={{ bg: 'gray.50' }}
    >
      <NextLink href={`/dashboard/forms/${data.id}`} passHref>
        <LinkOverlay>
          <Text>{data.name}</Text>
        </LinkOverlay>
      </NextLink>
      <Text fontSize="sm" color="gray.400">
        Updated at {format(new Date(data.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
      </Text>
    </LinkBox>
  )
})
