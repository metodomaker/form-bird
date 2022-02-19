import * as React from 'react'
import debounce from 'lodash/debounce'
import { Input } from '@chakra-ui/react'

interface Props {
  onSearch: (value: string) => Promise<void>
}

export default function FormListSearchInput({ onSearch }: Props) {
  const debouncedSearch = React.useRef(
    debounce(async (value: string) => {
      await onSearch(value)
    }, 300)
  ).current

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value)
    },
    []
  )

  React.useEffect(
    () => () => {
      debouncedSearch.cancel()
    },
    [debouncedSearch]
  )

  return (
    <Input
      defaultValue=""
      onChange={handleChange}
      placeholder="Search forms by name"
    />
  )
}
