import React from 'react'
import { InputGroupProps } from '../types/components'

const InputGroup = (props: InputGroupProps) => {
  return (
    <div className="mb-4">
      <label
        className={`block text-gray-700 text-sm font-bold mb-2 ${props.labelClassName}`}
        htmlFor={props.for}
      >
        {props.label}
      </label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${props.inputClassName}`}
        id={props.for}
        onChange={props.onChange}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
      />
    </div>
  )
}

export default InputGroup
