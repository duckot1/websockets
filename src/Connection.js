import React from 'react'

class Connection extends React.Component {
  constructor(props) {
    super(props)
    this.handleConnectClick = props.handleConnectClick
    this.handleDisconnectClick = props.handleDisconnectClick
  }

  render(props) {
    return (
      <div className="connection">
        <button onClick={this.handleConnectClick}>Connect</button>
        <button onClick={this.handleDisconnectClick}>Disconnect</button>
      </div>
    );
  }
}

export default Connection;
