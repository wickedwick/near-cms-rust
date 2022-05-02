import React from 'react'
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import CheckboxGroup from '../CheckboxGroup'
import { CheckboxProps } from '../../types/components';

configure({ adapter: new Adapter() });

const onChange = jest.fn()
const props: CheckboxProps = {
  checked: false,
  groupClassName: '',
  inputClassName: '',
  label: '',
  labelClassName: '',
  name: '',
  onChange: onChange,
}

describe('CheckboxGroup', () => {
  it('should render', () => {
    const wrapper = shallow(<CheckboxGroup {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should call onChange', () => {
    const wrapper = shallow(<CheckboxGroup {...props} />)
    wrapper.find('input').simulate('change')
    expect(onChange).toHaveBeenCalled()
  })
})
