import * as React from 'react'
import type { Form } from '@prisma/client'

export type EditableInputProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  | 'name'
  | 'disabled'
  | 'pattern'
  | 'required'
  | 'readOnly'
  | 'maxLength'
  | 'minLength'
  | 'max'
  | 'min'
  | 'defaultValue'
  | 'defaultChecked'
  | 'placeholder'
  | 'aria-label'
>

export type EditableSelectProps = Pick<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  | 'name'
  | 'required'
  | 'disabled'
  | 'defaultValue'
  | 'placeholder'
  | 'aria-label'
>

export type EditableTextareaProps = Pick<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  | 'name'
  | 'rows'
  | 'required'
  | 'disabled'
  | 'defaultValue'
  | 'maxLength'
  | 'minLength'
  | 'placeholder'
  | 'aria-label'
>

export interface OptionProps
  extends Pick<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    'value' | 'selected' | 'label' | 'disabled'
  > {
  name: string
}

export type FieldType =
  | { type: React.HTMLInputTypeAttribute; config: EditableInputProps }
  | { type: 'select'; config: EditableSelectProps; options: OptionProps[] }
  | { type: 'textarea'; config: EditableTextareaProps }

export interface SerializedForm extends Omit<Form, 'createdAt' | 'updatedAt'> {
  createdAt: string
  updatedAt: string
}

export interface FormEditorFormData {
  name: string
  about: string
  secureCode: string
  actionName: string
  schema: string
}
