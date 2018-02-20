var WebSocketController ={

  wsUri:  "wss://echo.websocket.org/",

  connectWebSocket: function() {
    this.websocket = new WebSocket(this.wsUri);
    return this.websocket
  },

  disconnectWebSocket: function() {
    this.websocket.close();
  },

  doSend: function(message) {
    this.websocket.send(message)
  }
}

export default WebSocketController
