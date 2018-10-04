import * as React from 'react'
import GlobalStyles from './GlobalStyles'
import TaskNotificationScreen from './TaskNotificationScreen'

class App extends React.Component {
  public render() {
    return (
      <>
        <GlobalStyles />
        <TaskNotificationScreen />
      </>
    )
  }
}

export default App
