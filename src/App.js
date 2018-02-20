import React from 'react';
import ChatBox from './ChatBox.js';
import ChatList from './ChatList.js';
import Connection from './Connection.js';
import WebSocket from './js/websockets.js';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      txt: "",
      connected: false
    }
    this.connectWebSocketAndListen()
  }

  updateMessageList = (messageObj) => {
    let connected = true;
    if (messageObj.body.split(' ')[0] == "Disconnected") connected = false
    this.state.messages.push(messageObj)
    this.setState({messages: this.state.messages, txt: "", connected});
  }

  update(e) {
    if (e.keyCode === 13) {
      if (this.state.txt !== "") {
        if (this.state.connected) {
          this.updateMessageList({body: this.state.txt, origin: "Me"})
          WebSocket.doSend(this.state.txt)
        } else {
          alert("Not connected to " +  WebSocket.wsUri)
        }
      }
    } else {
      this.setState({txt: e.target.value})
    }
  }

  handleSendClick() {
    if (this.state.txt !== "") {
      if (this.state.connected) {
        this.updateMessageList({body: this.state.txt, origin: "Me"})
        WebSocket.doSend(this.state.txt)
      } else {
        alert("Not connected to " +  WebSocket.wsUri)
      }
    }
  }

  handleConnectClick() {
    if (!this.state.connected) {
      this.connectWebSocketAndListen()
    }
  }

  handleDisconnectClick() {
    if (this.state.connected) {
      WebSocket.disconnectWebSocket()
    }
  }

  connectWebSocketAndListen () {
    let websocket = WebSocket.connectWebSocket();
    websocket.onmessage = (evt) => {
      this.updateMessageList({body: evt.data, origin: "Echo"})
    };
    websocket.onclose = (evt) => {
      this.updateMessageList({body: "Disconnected from " + WebSocket.wsUri, origin: "server"})
    };
    websocket.onopen = (evt) => {
      this.updateMessageList({body: "Connected to " + WebSocket.wsUri, origin: "server"})
    };
    websocket.onerror = (evt) => {
      alert(evt.data)
    };
  }

  render() {
    return  (
      <div className="container">
        <ChatList
          messages={this.state.messages}
        />
        <ChatBox
          handleClick={this.handleSendClick.bind(this)}
          txt={this.state.txt}
          update={this.update.bind(this)}
        />
        <Connection
          handleDisconnectClick={this.handleDisconnectClick.bind(this)}
          handleConnectClick={this.handleConnectClick.bind(this)}
        />
      </div>
    )
  }
}

export default App;
