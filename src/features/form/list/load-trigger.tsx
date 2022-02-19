import * as React from 'react'
import { Box, Skeleton } from '@chakra-ui/react'
import { useInView } from 'react-intersection-observer'

interface Props {
  isLoading: boolean
  isReachingEnd: boolean
  handleLoadMore: () => Promise<void>
}

export default function LoadTrigger({
  isLoading,
  isReachingEnd,
  handleLoadMore,
}: Props) {
  const { ref, inView } = useInView({
    threshold: 0,
    skip: isLoading || isReachingEnd,
  })

  React.useEffect(() => {
    if (inView) handleLoadMore()
  }, [inView])

  return (
    <Box ref={ref} w="full" h="60px" py={2} px={4}>
      {isReachingEnd ? (
        <Box color="gray.500">No more forms</Box>
      ) : (
        <Skeleton w="full" h="full" />
      )}
    </Box>
  )
}
