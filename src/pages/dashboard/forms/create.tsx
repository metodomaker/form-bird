import * as React from 'react'
import dynamic from 'next/dynamic'
import { useToast, Heading } from '@chakra-ui/react'

import DashboardLayout from '@/layouts/dashboard'

import type { FormEditorFormData } from '@/types'

const FormCreator = dynamic(() => import('@/features/form/creator'), {
  ssr: false,
})

export default function CreateForm() {
  const toast = useToast()

  const handleCreate = React.useCallback(async (data: FormEditorFormData) => {
    try {
      data.schema = data.schema.replace(/\r?\n|\r/g, '')

      const res = await fetch('/api/forms', {
        method: 'POST',
        body: JSON.stringify({ variables: { ...data } }),
      })
      const result = await res.json()
      toast({
        title: `Create success`,
        description: `Form ${result.data.createForm.name} created`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (err) {
      if (err instanceof Error) console.log(err.message)
    }
  }, [])

  return (
    <DashboardLayout>
      <Heading mb={6}>Create Form</Heading>
      <FormCreator handleCreate={handleCreate} />
    </DashboardLayout>
  )
}
