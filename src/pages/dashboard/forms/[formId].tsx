import * as React from 'react'
import { format } from 'date-fns'
import dynamic from 'next/dynamic'
import {
  useToast,
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
} from '@chakra-ui/react'

import type { GetServerSidePropsContext } from 'next'

import { getForm } from '@/controllers/forms'

import DashboardLayout from '@/layouts/dashboard'

import type { SerializedForm, FormEditorFormData } from '@/types'

const FormEditor = dynamic(() => import('@/features/form/editor'), {
  ssr: false,
})
const FormDeleteBtn = dynamic(() => import('@/features/form/delete-btn'), {
  ssr: false,
})
const FormScriptDisplayer = dynamic(
  () => import('@/features/form/script-displayer'),
  {
    ssr: false,
  }
)

type PageProps = {
  form: SerializedForm
}

export default function DashboardFormEditor({ form }: PageProps) {
  const toast = useToast()

  const handleUpdate = async (data: FormEditorFormData) => {
    try {
      data.schema = data.schema.replace(/\r?\n|\r/g, '')

      await fetch(`/api/forms/${form.id}`, {
        method: 'PUT',
        body: JSON.stringify({ variables: { ...data } }),
      })

      toast({
        title: `Update success`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (err) {
      if (err instanceof Error) console.log(err.message)
    }
  }

  return (
    <DashboardLayout>
      <Heading mb={6}>Form details</Heading>

      <Box mb={4}>
        <FormScriptDisplayer form={form} />
      </Box>

      <Accordion defaultIndex={[]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Form Editor
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <FormEditor form={form} handleUpdate={handleUpdate} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Advanced Options
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <FormDeleteBtn formId={form.id} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </DashboardLayout>
  )
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const form = await getForm({ id: params.formId as string })
  if (!form) return { notFound: true }

  const result: SerializedForm = {
    ...form,
    createdAt: format(form.createdAt, 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(form.updatedAt, 'yyyy-MM-dd HH:mm:ss'),
  }
  return { props: { form: result } }
}
