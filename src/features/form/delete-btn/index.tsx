import * as React from 'react'
import { useRouter } from 'next/router'
import { useToast, Button } from '@chakra-ui/react'

interface Props {
  formId: string
}

export default React.memo(function FormDeleteBtn({ formId }: Props) {
  const toast = useToast()
  const router = useRouter()
  const [isDeleting, setDeleting] = React.useState(false)

  const onDelete = async () => {
    try {
      setDeleting(true)
      await fetch(`/api/forms/${formId}`, { method: 'DELETE' })

      toast({
        title: 'Delete success',
        description: 'The form has been deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (err) {
      toast({
        title: 'Delete failed',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setDeleting(false)
      router.push('/dashboard/forms')
    }
  }

  return (
    <Button isLoading={isDeleting} onClick={onDelete}>
      Delete
    </Button>
  )
})
