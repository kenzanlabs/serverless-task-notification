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
import SwipeToDelete from 'react-swipe-to-delete-component'
import 'react-swipe-to-delete-component/dist/swipe-to-delete.css'
import * as socketIo from 'socket.io-client'
import * as uuidv4 from 'uuid/v4'
import AddTaskForm, {
  TaskFormContent,
} from './components/AddTaskForm'
import UserAvatar from './components/UserAvatar'
import { CreateTaskPayload, Task, TaskStatus } from './service/model/Task'
import { User } from './service/model/User'
import { createTask, deleteTask, getTasks } from './service/task.service'
import { getUsers } from './service/user.service'

/**
 * An exsting task comming from the server.
 */
interface ExistingTask {
  task: Task
  trackingId: null
  status: TaskStatus.Committed
}

/**
 * A task added in the current session, optimistically added to the task list
 * before its accepted by the API.
 */
interface OptimisticTask {
  task: CreateTaskPayload | Task
  trackingId: string
  status: TaskStatus
}

// Tasks in the UI are either optimistic or existing
type TaskState = ExistingTask | OptimisticTask

interface TaskNotificationScreenProps extends WithStyles<typeof styles> {}

interface TaskNotificationScreenState {
  tasks: TaskState[]
  users: User[]
}

const SERVER_URL = process.env.REACT_APP_SOCKET_DNS!
console.log(SERVER_URL)

class TaskNotificationScreen extends React.Component<
  TaskNotificationScreenProps,
  TaskNotificationScreenState
> {
  /**
   * A server task doesn't have a trackingId, as that's a FE fabricated concept
   */
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

    // Optimistically add a new task to the UI
    this.setState(({ tasks }) => ({
      tasks: [{ task, trackingId, status: TaskStatus.Pending }, ...tasks],
    }))

    try {
      const taskId = await createTask(task)

      // When the task is created and we've its ID, we update the optimistic task so we
      // can latter mark it as committed when it comes over the websocket
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

      // If an error happens, we remove the optimistically added task
      // TODO: Show an error notification
      this.setState(({ tasks }) => ({
        tasks: tasks.filter(
          optimisticTask => optimisticTask.trackingId !== trackingId,
        ),
      }))
    }
  }

  markTaskCommitted(taskId: string) {
    this.setState(({ tasks }) => ({
      tasks: tasks.map(
        optimisticTask =>
          (optimisticTask.task as Task).id === taskId
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
            // The user might have created some tasks before getTasks was able to resolve them,
            // keep them at the top
            ...existingLocalTasks,

            // Tasks coming from the server are already in the committed state, so we just
            // map them to an appropriate object shape
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

    // When the server acknowledges a created task, we mark it as committed,
    // which means the assignee of the task has or soon will-be notified
    this.socket.on('task updated', (taskId: string) => {
      this.markTaskCommitted(taskId)
    })
  }

  deleteTask(taskState: TaskState) {
    // There's a small window of time when a task doesn't have an ID
    // (e.g. is in the process on being created by the server) in that case we
    // avoid deleting it as it's not possible to delete a task without an ID
    if (TaskNotificationScreen.isServerTask(taskState)) {
      deleteTask(taskState.task.id).catch(console.error)
    }
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
        <Typography variant="title" color="textSecondary" gutterBottom={true}>
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

                const key = TaskNotificationScreen.isServerTask(taskState)
                  ? taskState.task.id
                  : taskState.trackingId

                return (
                  <React.Fragment key={key}>
                    <SwipeToDelete
                      key={key}
                      onDelete={() => this.deleteTask(taskState)}
                    >
                      <ListItem className={classes.listItem}>
                        <ListItemText>{task.body}</ListItemText>
                        {status === TaskStatus.Committed ? (
                          <CloudDone className={classes.sentIcon} />
                        ) : (
                          <CloudUpload className={classes.pendingIcon} />
                        )}
                        {this.renderAssignees(task)}
                      </ListItem>
                    </SwipeToDelete>
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
    listItem: {
      background: theme.palette.background.paper,
    },
  })

export default withStyles(styles)(TaskNotificationScreen)
