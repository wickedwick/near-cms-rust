import { Dispatch, SetStateAction } from "react"

export type InputGroupProps = {
  for: string
  groupClassName: string
  inputClassName: string
  label: string
  labelClassName: string
  placeholder: string
  type: "text" | "number" | "password" | "email" | "tel" | "date" | "time" | "datetime-local" | "month" | "week" | "url" | "search" | "color" | "file"
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export type CheckboxProps = {
  checked: boolean,
  groupClassName: string
  inputClassName: string
  label: string
  labelClassName: string
  name: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export type Field = {
  fieldType: string
  name: string
  value: string
  required: boolean
  maxLength: number
}

export type FieldTypesEditorProps = {
  fields: Field[],
  setFields: Dispatch<SetStateAction<Field[]>>
}

export type Option = {
  label: string
  value: string
}

export const fieldTypeOptions: Option[] = [
  { label: 'String', value: 'String' },
  { label: 'RichText', value: 'RichText' },
  { label: 'Int', value: 'Int' },
  { label: 'Float', value: 'Float' },
  { label: 'Boolean', value: 'Boolean' },
  { label: 'Date', value: 'Date' },
  { label: 'DateTime', value: 'DateTime' },
  { label: 'Time', value: 'Time' },
  { label: 'Password', value: 'Password' },
  { label: 'Email', value: 'Email' },
  { label: 'URL', value: 'URL' },
  { label: 'Phone', value: 'Phone' },
  { label: 'Postal Code', value: 'PostalCode' },
  { label: 'IP', value: 'IP' },
  { label: 'Image', value: 'Image' },
  { label: 'Video', value: 'Video' },
  { label: 'File', value: 'File' },
  { label: 'Custom', value: 'Custom' }
]

export type LayoutProps = {
  children: React.ReactNode
  home: boolean
}
