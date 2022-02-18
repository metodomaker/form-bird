import * as React from 'react'
import { useSWRConfig } from 'swr'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import crypto from 'crypto'
import {
  useToast,
  Input,
  Button,
  HStack,
  VStack,
  Heading,
  Textarea,
  FormLabel,
  InputGroup,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  InputRightElement,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import Editor from 'react-simple-code-editor'
import { format } from 'date-fns'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-json'

import 'prismjs/themes/prism.css'

import type { Form } from '@prisma/client'

import { getForm } from '@/controllers/forms'

import DashboardLayout from '@/layouts/dashboard'

interface SerializedForm extends Omit<Form, 'createdAt' | 'updatedAt'> {
  createdAt: string
  updatedAt: string
}

interface FormData {
  name: string
  about: string
  secureCode: string
  actionName: string
  schema: string
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

type PageProps = {
  form: SerializedForm
}

export default function FormEditor({ form }: PageProps) {
  const toast = useToast()
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const [isDeleting, setDeleting] = React.useState(false)
  const {
    reset,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: form.name,
      about: form.about,
      secureCode: form.secureCode,
      actionName: form.actionName,
      schema: `${JSON.stringify(form.schema, null, 2)}`,
    },
  })

  const handleGenSecureCode = () => {
    setValue('secureCode', crypto.randomBytes(18).toString('hex'))
  }

  const onDelete = async () => {
    try {
      setDeleting(true)
      await fetch(`/api/forms/${form.id}`, {
        method: 'DELETE',
      })
      toast({
        title: 'Form deleted',
        description: 'The form has been deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setDeleting(false)
      router.push('/dashboard', { query: { hint: 'refresh' } })
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      data.schema = data.schema.replace(/\r?\n|\r/g, '')

      const res = await fetch(`/api/forms/${form.id}`, {
        method: 'PUT',
        body: JSON.stringify({ variables: { ...data } }),
      })
      const result = await res.json()
      reset()
      toast({
        title: `Update success`,
        description: `Form ${result.data.createForm.name} updated`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message)
      }
    }
  }

  return (
    <DashboardLayout>
      <Heading mb={6}>Form details</Heading>

      <Accordion defaultIndex={[0]} allowMultiple>
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
            <VStack
              as="form"
              mb={4}
              onSubmit={handleSubmit(onSubmit)}
              spacing={4}
            >
              <FormControl isInvalid={Boolean(errors.name)}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  disabled={isDeleting || isSubmitting}
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={Boolean(errors.about)}>
                <FormLabel htmlFor="about">About</FormLabel>
                <Textarea
                  id="about"
                  rows={3}
                  resize="none"
                  disabled={isDeleting || isSubmitting}
                  {...register('about')}
                />
              </FormControl>

              <HStack w="full" spacing={4} align="flex-start">
                <FormControl isInvalid={Boolean(errors.secureCode)}>
                  <FormLabel htmlFor="secureCode">Secure Code</FormLabel>
                  <InputGroup>
                    <Input
                      id="secureCode"
                      disabled={isDeleting || isSubmitting}
                      {...register('secureCode', { required: true })}
                    />
                    <InputRightElement width="8rem">
                      <Button size="sm" onClick={handleGenSecureCode}>
                        Generate One
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText>For protect each form request</FormHelperText>
                  {errors.secureCode && (
                    <FormErrorMessage>
                      {errors.secureCode.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={Boolean(errors.actionName)}>
                  <FormLabel htmlFor="actionName">Action Name</FormLabel>
                  <Input
                    id="actionName"
                    disabled={isDeleting || isSubmitting}
                    {...register('actionName', { required: true })}
                  />
                  <FormHelperText>
                    API address that form will post
                  </FormHelperText>
                  {errors.actionName && (
                    <FormErrorMessage>
                      {errors.actionName.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </HStack>

              <FormControl isInvalid={Boolean(errors.schema)}>
                <FormLabel htmlFor="schema">Schema</FormLabel>
                <Controller
                  control={control}
                  name="schema"
                  defaultValue={form.schema.toString()}
                  render={({ field: { onChange, value } }) => (
                    <Editor
                      value={value}
                      onValueChange={onChange}
                      highlight={code => highlight(code, languages.json)}
                      padding={10}
                      disabled={isDeleting || isSubmitting}
                      style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                      }}
                    />
                  )}
                />
              </FormControl>

              <Button
                alignSelf="flex-start"
                type="submit"
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </VStack>
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
            <Button isLoading={isDeleting} onClick={onDelete}>
              Delete
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </DashboardLayout>
  )
}
