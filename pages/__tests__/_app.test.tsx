import React from 'react'
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import MyApp from "../_app";

configure({ adapter: new Adapter() });

const props: any = {
  Component: MyApp,
  pageProps: {},
}

describe('_app', () => {
  it('should render', () => {
    const wrapper = shallow(<MyApp {...props} />)
    expect(wrapper).toMatchSnapshot()
  });
})