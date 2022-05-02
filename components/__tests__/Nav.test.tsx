import React from 'react'
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Nav from '../Nav'

configure({ adapter: new Adapter() });

describe('Nav', () => {
  it('should render', () => {
    const wrapper = shallow(<Nav />)
    expect(wrapper).toMatchSnapshot()
  })
})
