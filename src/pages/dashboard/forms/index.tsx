import useSWRInfinite from 'swr/infinite'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Heading,
  Button,
  Flex,
  Text,
  VStack,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Icon,
  Input,
} from '@chakra-ui/react'
import { FiInbox } from 'react-icons/fi'
import { format } from 'date-fns'
import * as React from 'react'
import debounce from 'lodash/debounce'

import fetcher from '@/utils/fetcher'

import DashboardLayout from '@/layouts/dashboard'

const PAGE_SIZE = 10

export default function DashboardForms() {
  const router = useRouter()
  const [inputQ, setInputQ] = React.useState('')
  const [q, setQ] = React.useState(inputQ)
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

  const debouncedSearch = React.useRef(
    debounce(async (value: string) => {
      setQ(value)
      await setSize(1)
    }, 300)
  ).current

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value)
    },
    []
  )

  const handleToCreate = () => {
    router.push('/dashboard/forms/create')
  }

  React.useEffect(
    () => () => {
      debouncedSearch.cancel()
    },
    [debouncedSearch]
  )

  return (
    <DashboardLayout>
      <Heading mb={6}>Forms</Heading>

      <Button
        isLoading={isLoadingMore}
        onClick={() => {
          mutate()
        }}
      >
        Refresh
      </Button>

      <Input
        mb={4}
        defaultValue=""
        onChange={handleChange}
        placeholder="Search forms by name"
      />

      {isLoadingMore && <Skeleton w="full" h="60px" />}

      {isEmpty && (
        <Flex
          w="full"
          color="gray.500"
          flexDir="column"
          align="center"
          justify="center"
        >
          <Icon as={FiInbox} mb={1} w={6} h={6} />
          <Text mb={1} fontWeight="bold">
            No Form Exist
          </Text>
          <Button size="sm" onClick={handleToCreate}>
            Create One
          </Button>
        </Flex>
      )}

      <VStack mb={4}>
        {forms.map(form => (
          <LinkBox
            as={Flex}
            key={form.id}
            w="full"
            h="60px"
            flexDir="column"
            justify="space-between"
            textDecoration="none"
            py={2}
            px={4}
            _hover={{ bg: 'gray.50' }}
          >
            <NextLink href={`/dashboard/forms/${form.id}`} passHref>
              <LinkOverlay>
                <Text>{form.name}</Text>
              </LinkOverlay>
            </NextLink>
            <Text fontSize="sm" color="gray.400">
              Updated at{' '}
              {format(new Date(form.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
            </Text>
          </LinkBox>
        ))}
      </VStack>

      <Button
        size="sm"
        isLoading={isLoadingMore}
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
      >
        {isReachingEnd ? 'no more forms' : 'load more'}
      </Button>
    </DashboardLayout>
  )
}
