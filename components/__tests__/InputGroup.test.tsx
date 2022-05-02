import React from 'react'
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import InputGroup from '../InputGroup'
import { InputGroupProps } from '../../types/components';

configure({ adapter: new Adapter() });

const onChange = jest.fn()
const props: InputGroupProps = {
  groupClassName: '',
  labelClassName: '',
  inputClassName: '',
  for: '',
  label: '',
  value: '',
  placeholder: '',
  type: 'text',
  onChange
}

describe('InputGroup', () => {
  it('should render', () => {
    const wrapper = shallow(<InputGroup {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should call onChange', () => {
    const wrapper = shallow(<InputGroup {...props} />)
    wrapper.find('input').simulate('change')
    expect(onChange).toHaveBeenCalled()
  })
})
