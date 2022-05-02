import React from 'react'
import { CheckboxProps } from '../types/components'

const CheckboxGroup = (props: CheckboxProps) => {
  return (
    <div className={`md:flex md:items-center mb-6 ${props.groupClassName}`}>
      <label className={`md:w-2/3 block text-gray-500 font-bold ${props.labelClassName}`}>
        <input className={`mr-2 leading-tight ${props.inputClassName}`}
          checked={props.checked}
          name={props.name}
          onChange={props.onChange}
          type="checkbox"
        />
        <span className="text-sm">
          {props.label}
        </span>
      </label>
    </div>
  )
}

export default CheckboxGroup
