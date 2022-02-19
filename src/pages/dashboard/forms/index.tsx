import * as React from 'react'
import dynamic from 'next/dynamic'
import useSWRInfinite from 'swr/infinite'
import { Box, Flex, Button, Heading, Skeleton } from '@chakra-ui/react'

import fetcher from '@/utils/fetcher'

import DashboardLayout from '@/layouts/dashboard'

const FormList = dynamic(() => import('@/features/form/list'), { ssr: false })
const FormListEmpty = dynamic(() => import('@/features/form/list/empty'), {
  ssr: false,
})
const FormSearchInput = dynamic(() => import('@/features/form/search-input'), {
  ssr: false,
})

const PAGE_SIZE = 10

export default function DashboardForms() {
  const [q, setQ] = React.useState('')
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null
      return `/api/forms?perPage=${PAGE_SIZE}&page=${pageIndex + 1}${
        q ? `&q=${q}` : ''
      }`
    },
    fetcher
  )

  const forms = data ? [].concat(...data) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = size < PAGE_SIZE
  const isRefreshing = isValidating && data && data.length === size

  const handleRefresh = async () => {
    await mutate()
  }

  const handleSeach = React.useCallback(async (value: string) => {
    setQ(value)
    await setSize(1)
  }, [])

  const handleLoadMore = React.useCallback(async () => {
    if (isReachingEnd) return
    await setSize(size + 1)
  }, [isReachingEnd, setSize, size])

  return (
    <DashboardLayout>
      <Heading mb={6}>Forms</Heading>

      <Flex mb={4} w="full" align="center">
        <Box flex="auto" w="full" mr={2}>
          <FormSearchInput onSearch={handleSeach} />
        </Box>
        <Box flex="none">
          <Button
            onClick={handleRefresh}
            disabled={isLoadingMore}
            isLoading={isRefreshing}
          >
            Refresh
          </Button>
        </Box>
      </Flex>

      {isLoadingMore && <Skeleton w="full" h="60px" />}
      {isEmpty ? (
        <FormListEmpty />
      ) : (
        <FormList
          forms={forms}
          isLoadingMore={isLoadingMore}
          isReachingEnd={isReachingEnd}
          handleLoadMore={handleLoadMore}
        />
      )}
    </DashboardLayout>
  )
}
