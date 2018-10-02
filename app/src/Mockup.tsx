import Divider from '@material-ui/core/Divider/Divider'
import Grid from '@material-ui/core/Grid/Grid'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import Paper from '@material-ui/core/Paper/Paper'
import CloudUpload from '@material-ui/icons/CloudUpload';
import CloudDone from '@material-ui/icons/CloudDone';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import * as React from 'react'
import AddTaskForm, { Task, TaskStatus } from './components/AddTaskForm/AddTaskForm'
import UserAvatar from './components/UserAvatar/UserAvatar'
import * as socketIo from 'socket.io-client'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: '0 auto',
      maxWidth: 760,
      minHeight: '100%',
      flex: 1,
      [theme.breakpoints.up('md')]: {
        padding: `${theme.spacing.unit * 5}px 0`,
      },
    },
    taskFormRoot: {
      width: '100%',
    },
    taskListRoot: {
      flex: 1,
    },
    sentIcon: {
      color: green[800]
    },
    pendingIcon: {
      color: red[800]
    }
  })

interface MockupProps extends WithStyles<typeof styles> {

}

interface MockupState {
  tasks: Task[]
}

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:9000'
const users = [
  { name: 'John Connor' },
  { name: 'Luis Hernandez' },
  { name: 'Bob' },
  { name: 'Kelly' },
]

class Mockup extends React.Component<MockupProps, MockupState> {
  state: MockupState = {
    tasks: [],
  }
  socket: SocketIOClient.Socket = socketIo(SERVER_URL);;

  handleTaskCreated = (task: Task) => {
    // This log is only for getting the taskID for use with postman. Remove once all app is connected
    console.log(task.id)
    this.setState(({ tasks }) => ({ tasks: [task, ...tasks] }))
  }

  componentDidMount() {
    this.socket.on('task updated', (taskID: string) => {
      this.updateTaskArray(taskID);
    });
  }

  updateTaskArray(taskID: string) {
    const tasks = [...this.state.tasks];
    const foundTask = tasks.find(item => item.id === taskID);

    if(!foundTask) return

    foundTask.status = TaskStatus.Sent;
    this.setState(({ tasks }) => ({ tasks}))
  }

  render() {
    const { classes } = this.props

    // Remove H1 after testing
    return (
      <Grid
        direction="column"
        container={true}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item={true} xs={12} className={classes.taskFormRoot}>
          <AddTaskForm users={users} onTaskCreated={this.handleTaskCreated} />
        </Grid>

        <Grid item={true} container={true} xs={true} direction="column">
          <Paper className={classes.taskListRoot}>
            <List component="nav">
              {this.state.tasks.map((task, i) => {

                return (
                  <React.Fragment key={i}>
                    <ListItem>
                      <ListItemText>{task.title}</ListItemText>
                      {
                        task.status === TaskStatus.Sent ?
                          <CloudDone  className={classes.sentIcon}/> :
                          <CloudUpload className={classes.pendingIcon}/>}
                      {task.assignedTo.map(user => (
                        <UserAvatar key={user.name} userName={user.name} />
                      ))}
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                )
              })}
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Mockup)
