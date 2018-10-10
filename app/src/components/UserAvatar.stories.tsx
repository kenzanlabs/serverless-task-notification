import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import * as React from 'react'
import UserAvatar from './UserAvatar'

storiesOf('UserAvatar', module).addWithJSX('default', () => {
  return <UserAvatar userName={text('username', 'John Connor')} />
})
