import * as React from 'react'
import GlobalStyles from './GlobalStyles'
import Mockup from './Mockup'
import {Task, TaskStatus} from './components/AddTaskForm/AddTaskForm'

import * as socketIo from 'socket.io-client';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:9000';

interface AppState {
  triggerStatusChange: boolean
}

class App extends React.Component {
  private socket: SocketIOClient.Socket;
  state: AppState = {
    triggerStatusChange: false
  }

  constructor(props: any) {
    super(props);

    this.socket = socketIo(SERVER_URL);

    this.socket.on('task updated', (task: Task) => {
      this.setState({
        triggerStatusChange: true
      });
    });

    this.updateTask = this.updateTask.bind(this);
    this.registerTask = this.registerTask.bind(this);
  }

  updateTask(task: Task) {
    this.socket.emit('update task', task);
  }

  registerTask(task: Task) {
    const status = TaskStatus[task.status];
    const {id} = task;
    const task_details = {id, status}

    this.socket.emit('register task', task_details)
  }

  public render() {

    return (
      <>
        <GlobalStyles />
        <Mockup
          handleTaskCreate={this.registerTask}
          isStatusUpdated={this.state.triggerStatusChange}
          handleTaskUpdate={this.updateTask}
        />
      </>
    )
  }
}

export default App
