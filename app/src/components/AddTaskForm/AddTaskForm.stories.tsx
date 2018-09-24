import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { noop } from 'lodash'
import * as React from 'react'
import AddTaskForm from './AddTaskForm'

storiesOf('AddTaskForm', module).addWithJSX('default', () => {
  return (
    <AddTaskForm
      users={object('users', [
        { name: 'John Connor' },
        { name: 'Luis Hernandez' },
        { name: 'Bob' },
        { name: 'Kelly' },
      ])}
      onTaskCreated={noop}
    />
  )
})
