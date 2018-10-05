import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import Divider from '@material-ui/core/Divider/Divider'
import Grid from '@material-ui/core/Grid/Grid'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import Paper from '@material-ui/core/Paper/Paper'
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography/Typography'
import CloudDone from '@material-ui/icons/CloudDone'
import CloudUpload from '@material-ui/icons/CloudUpload'
import * as React from 'react'
import * as socketIo from 'socket.io-client'
import * as uuidv4 from 'uuid/v4'
import AddTaskForm, {
  TaskFormContent,
} from './components/AddTaskForm/AddTaskForm'
import UserAvatar from './components/UserAvatar/UserAvatar'
import { CreateTaskPayload, Task, TaskStatus } from './service/model/Task'
import { User } from './service/model/User'
import { createTask, getTasks } from './service/task.service'
import { getUsers } from './service/user.service'

interface ExistingTask {
  task: Task
  trackingId: null
  status: TaskStatus.Committed
}

interface OptimisticTask {
  task: CreateTaskPayload | Task
  trackingId: string
  status: TaskStatus
}

type TaskState = ExistingTask | OptimisticTask

interface TaskNotificationScreenProps extends WithStyles<typeof styles> {}

interface TaskNotificationScreenState {
  tasks: TaskState[]
  users: User[]
}

const SERVER_URL = process.env.REACT_APP_SOCKET_DNS!

class TaskNotificationScreen extends React.Component<
  TaskNotificationScreenProps,
  TaskNotificationScreenState
> {
  static isServerTask(task: TaskState): task is ExistingTask {
    return !task.trackingId
  }

  state: TaskNotificationScreenState = {
    tasks: [],
    users: [],
  }

  socket?: SocketIOClient.Socket

  handleTaskCreated = async ({
    title,
    assignedTo,
    notificationType,
  }: TaskFormContent) => {
    const task = {
      body: title,
      contactID: assignedTo.length > 0 ? assignedTo[0].id : null,
      type: notificationType,
    }

    const trackingId = uuidv4()

    // optimistically add a new task
    this.setState(({ tasks }) => ({
      tasks: [{ task, trackingId, status: TaskStatus.Pending }, ...tasks],
    }))

    try {
      const taskId = await createTask(task)

      // when we have the ID, we update the optimistic task so we can latter commit it when it comes
      // over the websocket
      this.setState(({ tasks }) => ({
        tasks: tasks.map(
          optimisticTask =>
            optimisticTask.trackingId === trackingId
              ? ({
                  ...optimisticTask,
                  task: { ...optimisticTask.task, id: taskId },
                } as OptimisticTask)
              : optimisticTask,
        ),
      }))
    } catch (e) {
      console.error(e)
    }
  }

  markTaskCommitted(taskID: string) {
    this.setState(({ tasks }) => ({
      tasks: tasks.map(
        optimisticTask =>
          (optimisticTask.task as Task).id === taskID
            ? ({
                ...optimisticTask,
                status: TaskStatus.Committed,
              } as OptimisticTask)
            : optimisticTask,
      ),
    }))
  }

  componentDidMount() {
    getUsers()
      .then(users => {
        this.setState({ users })
      })
      .catch(console.error)

    getTasks()
      .then(tasksFromServer => {
        this.setState(({ tasks: existingLocalTasks }) => ({
          tasks: [
            // the user might have created some tasks before getTasks was able to resolve them, keep them at the top
            ...existingLocalTasks,

            // tasks coming from the server are already in the committed state
            ...tasksFromServer.map(
              task =>
                ({
                  task,
                  status: TaskStatus.Committed,
                  trackingId: null,
                } as ExistingTask),
            ),
          ],
        }))
      })
      .catch(console.error)

    this.socket = socketIo(SERVER_URL)

    this.socket.on('task updated', (taskId: string) => {
      console.log('>>>', taskId)
      this.markTaskCommitted(taskId)
    })
  }

  componentWillUnmount() {
    if (this.socket) this.socket.disconnect()
  }

  render() {
    const { classes } = this.props

    return (
      <Grid
        direction="column"
        container={true}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Typography variant="headline" gutterBottom={true}>
          Serverless Task Notification
        </Typography>

        <Grid item={true} xs={12} className={classes.taskFormRoot}>
          <AddTaskForm
            users={this.state.users}
            onTaskCreated={this.handleTaskCreated}
          />
        </Grid>

        <Grid item={true} container={true} xs={true} direction="column">
          <Paper className={classes.taskListRoot}>
            <List component="nav">
              {this.state.tasks.map(taskState => {
                const { task, status } = taskState

                return (
                  <React.Fragment
                    key={
                      TaskNotificationScreen.isServerTask(taskState)
                        ? taskState.task.id
                        : taskState.trackingId
                    }
                  >
                    <ListItem>
                      <ListItemText>{task.body}</ListItemText>
                      {status === TaskStatus.Committed ? (
                        <CloudDone className={classes.sentIcon} />
                      ) : (
                        <CloudUpload className={classes.pendingIcon} />
                      )}
                      {this.renderAssignees(task)}
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

  renderAssignees({ contactID }: CreateTaskPayload | Task) {
    const user = this.state.users.find(({ id }) => id === contactID)

    return user ? <UserAvatar userName={user.name} key={user.id} /> : null
  }
}

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
      color: green[800],
    },
    pendingIcon: {
      color: red[800],
    },
  })

export default withStyles(styles)(TaskNotificationScreen)
