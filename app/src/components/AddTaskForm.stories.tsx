import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { noop } from 'lodash'
import * as React from 'react'
import AddTaskForm from './AddTaskForm'

storiesOf('AddTaskForm', module).addWithJSX('default', () => {
  return (
    <AddTaskForm
      users={object('users', [
        { name: 'John Connor', id: '1', email: '' },
        { name: 'Luis Hernandez', id: '2', email: '' },
        { name: 'Bob', id: '3', email: '' },
        { name: 'Kelly', id: '4', email: '' },
      ])}
      onTaskCreated={noop}
    />
  )
})
