import * as React from 'react'
import { VStack } from '@chakra-ui/react'

import type { SerializedForm } from '@/types'

import FormListItem from './item'
import LoadTrigger from './load-trigger'

interface Props {
  forms: SerializedForm[]
  isLoadingMore: boolean
  isReachingEnd: boolean
  handleLoadMore: () => Promise<void>
}

export default function FormList({
  forms,
  isLoadingMore,
  isReachingEnd,
  handleLoadMore,
}: Props) {
  return (
    <VStack spacing={2}>
      {forms.map(form => (
        <FormListItem data={form} key={form.id} />
      ))}
      <LoadTrigger
        isLoading={isLoadingMore}
        isReachingEnd={isReachingEnd}
        handleLoadMore={handleLoadMore}
      />
    </VStack>
  )
}
