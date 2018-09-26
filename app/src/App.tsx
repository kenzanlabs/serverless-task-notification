import * as React from 'react'
import GlobalStyles from './GlobalStyles'
import Mockup from './Mockup'

import * as socketIo from 'socket.io-client';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:9000';

interface AppState {
  message: string
}

interface Task {
  id: string;
  status: string;
  user: string;
  task: string;
}

class App extends React.Component {
  public state: AppState;
  private socket: SocketIOClient.Socket;

  constructor(props: any) {
    super(props);

    this.socket = socketIo(SERVER_URL);
    this.state = {
      message: ''
    }

    this.socket.on('task updated', (task: Task) => {
      this.setState({
        message: task.task
      });
    });
  }


  componentDidMount() {
    this.socket.emit('register task', {user: 'nerney', task: 'Have Breakfast'})

    // this timer is for testing updating task status, remove later
    setTimeout(() => {
      this.socket.emit('update task', {id: '62c9a4c0-cb3d-4ea2-81ed-80c38ba5859d', status: 'sent'});
    }, 5000)
  }

  public render() {

    return (
      <>
        <GlobalStyles />
        <Mockup message={this.state.message}/>
      </>
    )
  }
}

export default App
