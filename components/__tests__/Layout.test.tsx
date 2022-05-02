import React from 'react'
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Layout from '../Layout'

configure({ adapter: new Adapter() });

describe('Layout', () => {
  it('should render', () => {
    const wrapper = shallow(<Layout />)
    expect(wrapper).toMatchSnapshot()
  })
})
