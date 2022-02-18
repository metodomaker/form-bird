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
} from '@chakra-ui/react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-json'

import 'prismjs/themes/prism.css'

import DashboardLayout from '@/layouts/dashboard'

interface FormData {
  name: string
  about: string
  secureCode: string
  actionName: string
  schema: string
}

export default function CreateForm() {
  const toast = useToast()
  const {
    reset,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      about: '',
      secureCode: '',
      actionName: 'logger',
      schema: `[]`,
    },
  })

  const handleGenSecureCode = () => {
    setValue('secureCode', crypto.randomBytes(18).toString('hex'))
  }

  const onSubmit = async (data: FormData) => {
    try {
      data.schema = data.schema.replace(/\r?\n|\r/g, '')

      const res = await fetch('/api/forms', {
        method: 'POST',
        body: JSON.stringify({ variables: { ...data } }),
      })
      const result = await res.json()
      reset()
      toast({
        title: `Create success`,
        description: `Form ${result.data.createForm.name} created`,
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
      <Heading mb={6}>Create Form</Heading>

      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
        <FormControl isInvalid={Boolean(errors.name)}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" {...register('name', { required: true })} />
          {errors.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={Boolean(errors.about)}>
          <FormLabel htmlFor="about">About</FormLabel>
          <Textarea id="about" rows={3} resize="none" {...register('about')} />
        </FormControl>

        <HStack w="full" spacing={4} align="flex-start">
          <FormControl isInvalid={Boolean(errors.secureCode)}>
            <FormLabel htmlFor="secureCode">Secure Code</FormLabel>
            <InputGroup>
              <Input
                id="secureCode"
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
              <FormErrorMessage>{errors.secureCode.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={Boolean(errors.actionName)}>
            <FormLabel htmlFor="actionName">Action Name</FormLabel>
            <Input
              id="actionName"
              {...register('actionName', { required: true })}
            />
            <FormHelperText>API address that form will post</FormHelperText>
            {errors.actionName && (
              <FormErrorMessage>{errors.actionName.message}</FormErrorMessage>
            )}
          </FormControl>
        </HStack>

        <FormControl isInvalid={Boolean(errors.schema)}>
          <FormLabel htmlFor="schema">Schema</FormLabel>
          <Controller
            control={control}
            name="schema"
            defaultValue="[]"
            render={({ field: { onChange, value } }) => (
              <Editor
                value={value}
                onValueChange={onChange}
                highlight={code => highlight(code, languages.json)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                }}
              />
            )}
          />
        </FormControl>

        <Button alignSelf="flex-start" type="submit" isLoading={isSubmitting}>
          Submit
        </Button>
      </VStack>
    </DashboardLayout>
  )
}
