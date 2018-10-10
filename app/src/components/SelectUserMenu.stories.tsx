import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import SelectUserMenu from './SelectUserMenu'

storiesOf('SelectUserMenu', module).addWithJSX('default', () => {
  return (
    <SelectUserMenu
      userItems={object('userItems', [
        {
          selected: false,
          highlighted: true,
          user: { name: 'Highlighted', id: '1', email: '' },
        },
        {
          selected: true,
          highlighted: false,
          user: { name: 'Selected', id: '2', email: '' },
        },
        {
          selected: true,
          highlighted: true,
          user: { name: 'Both', id: '3', email: '' },
        },
      ])}
    />
  )
})
