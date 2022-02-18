import * as React from 'react'

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
>

export type EditableSelectProps = Pick<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'name' | 'required' | 'disabled' | 'defaultValue' | 'placeholder'
>

export type EditableTextareaProps = Pick<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  | 'name'
  | 'required'
  | 'disabled'
  | 'defaultValue'
  | 'maxLength'
  | 'minLength'
  | 'placeholder'
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
