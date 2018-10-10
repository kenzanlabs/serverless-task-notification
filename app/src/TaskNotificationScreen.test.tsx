import { mount } from 'enzyme'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import TaskNotificationScreen from './TaskNotificationScreen'

describe('TaskNotificationScreen', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TaskNotificationScreen />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders and matches our snapshot', () => {
    const component = mount(<TaskNotificationScreen />)
    expect(component).toMatchSnapshot()
  })
})
