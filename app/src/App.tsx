import * as React from 'react'
import GlobalStyles from './GlobalStyles'
import Mockup from './Mockup'

import * as socketIo from 'socket.io-client';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:9000';

interface AppState {
  message: string
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

    this.socket.on('notification sent', (notification: Notification) => {
      this.setState({
        message: notification
      });
    });
  }

  public render() {
    return (
      <div>
        <GlobalStyles />
        <Mockup />
      </div>
    )
  }
}

export default App
