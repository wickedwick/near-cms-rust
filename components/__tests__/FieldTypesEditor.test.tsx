import React from 'react'
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import FieldTypesEditor from '../FieldTypesEditor'
import { FieldTypesEditorProps } from '../../types/components';

configure({ adapter: new Adapter() });

const setFieldsFunc = jest.fn()
const props: FieldTypesEditorProps = {
  fields: [],
  setFields: setFieldsFunc
}

describe('FieldTypesEditor', () => {
  it('should render', () => {
    const wrapper = shallow(<FieldTypesEditor {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should call setFields', () => {
    const wrapper = shallow(<FieldTypesEditor {...props} />)
    wrapper.find('button').simulate('click')
    expect(setFieldsFunc).toHaveBeenCalled()
  })
})
