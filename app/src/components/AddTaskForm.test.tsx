import { mount } from 'enzyme'
import { noop } from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import AddTaskForm from './AddTaskForm'

describe('AddTaskForm', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AddTaskForm users={[]} onTaskCreated={noop} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders and matches our snapshot', () => {
    const component = mount(<AddTaskForm users={[]} onTaskCreated={noop} />)
    expect(component).toMatchSnapshot()
  })

  it('creates a task with the inputted title', () => {
    const onTaskCreated = jest.fn()

    const wrapper = mount(
      <AddTaskForm users={[]} onTaskCreated={onTaskCreated} />,
    )

    wrapper
      .find('input[type="text"]')
      .simulate('change', { target: { value: 'A task' } })

    wrapper.find('form').simulate('submit')

    expect(onTaskCreated).toBeCalledWith(
      expect.objectContaining({
        assignedTo: [],
        title: 'A task',
      }),
    )
  })
})
