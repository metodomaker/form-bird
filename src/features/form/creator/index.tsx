import * as React from 'react'
import Editor from 'react-simple-code-editor'
import { useForm, Controller } from 'react-hook-form'
import { highlight, languages } from 'prismjs/components/prism-core'
import {
  Input,
  Button,
  HStack,
  VStack,
  Textarea,
  FormLabel,
  InputGroup,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  InputRightElement,
} from '@chakra-ui/react'

import 'prismjs/components/prism-json'
import 'prismjs/themes/prism.css'

import { randomHex } from '@/utils/crypto'

import type { FormEditorFormData } from '@/types'

interface Props {
  handleCreate: (data: FormEditorFormData) => Promise<void>
}

export default React.memo(function FormCreator({ handleCreate }: Props) {
  const {
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormEditorFormData>({
    defaultValues: {
      name: '',
      about: '',
      secureCode: '',
      actionName: 'logger',
      schema: `[]`,
    },
  })

  const handleGenSecureCode = () => {
    setValue('secureCode', randomHex(18))
  }

  const onSubmit = async (data: FormEditorFormData) => {
    try {
      await handleCreate(data)
      reset()
    } catch (err) {
      if (err instanceof Error) console.log(err.message)
    }
  }

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          disabled={isSubmitting}
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
          disabled={isSubmitting}
          {...register('about')}
        />
      </FormControl>

      <HStack w="full" spacing={4} align="flex-start">
        <FormControl isInvalid={Boolean(errors.secureCode)}>
          <FormLabel htmlFor="secureCode">Secure Code</FormLabel>
          <InputGroup>
            <Input
              id="secureCode"
              disabled={isSubmitting}
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
            disabled={isSubmitting}
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
          defaultValue={`[]`}
          render={({ field: { onChange, value } }) => (
            <Editor
              value={value}
              onValueChange={onChange}
              highlight={code => highlight(code, languages.json)}
              padding={10}
              disabled={isSubmitting}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
              }}
            />
          )}
        />
      </FormControl>

      <Button type="submit" alignSelf="flex-start" isLoading={isSubmitting}>
        Submit
      </Button>
    </VStack>
  )
})
