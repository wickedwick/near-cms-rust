import { configure, shallow } from 'enzyme'
import ContentTypes from '../../contentTypes'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

configure({ adapter: new Adapter() })

describe('ContentTypes', () => {
  it('shoud render', () => {
    const wrapper = shallow(<ContentTypes />)
    expect(wrapper).toMatchSnapshot()
  })
})
