import React from 'react'
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ActionButton from '../ActionButton'

configure({ adapter: new Adapter() });

const clickFunc = jest.fn()

describe('ActionButton', () => {
  it('should render', () => {
    const wrapper = shallow(<ActionButton onClick={clickFunc}>Text</ActionButton>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should call onClick', () => {
    const wrapper = shallow(<ActionButton onClick={clickFunc}>Text</ActionButton>)
    wrapper.find('button').simulate('click')
    expect(clickFunc).toHaveBeenCalled()
  })
})
