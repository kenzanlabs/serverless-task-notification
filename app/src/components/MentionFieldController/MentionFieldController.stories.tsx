import { storiesOf } from '@storybook/react'
import * as React from 'react'
import MentionFieldController from './MentionFieldController'

storiesOf('MentionFieldController', module)
  .addWithJSX('default', () => {
    return (
      <MentionFieldController>
        {state => <div>{JSON.stringify(state)}</div>}
      </MentionFieldController>
    )
  })
