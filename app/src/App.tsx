import { createStyles, WithStyles, withStyles } from '@material-ui/core'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import * as React from 'react'
import GlobalStyles from './GlobalStyles'
import TaskNotificationScreen from './TaskNotificationScreen'

interface AppProps extends WithStyles<typeof styles> {}

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

class App extends React.Component<AppProps> {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <GlobalStyles />
        <div className={this.props.classes.root}>
          <TaskNotificationScreen />
        </div>
      </MuiThemeProvider>
    )
  }
}

const styles = createStyles({
  root: {
    padding: '24px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
})

export default withStyles(styles)(App)
