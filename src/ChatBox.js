import React from 'react';

class ChatBox extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = props.handleClick
    this.update = props.update
  }

  render(props) {
    return (
      <div className="chatBox">
        <textarea onKeyDown={this.update} onChange={this.update} value={this.props.txt}/>
        <button onClick={this.handleClick}>Send</button>
      </div>
    );
  }
}

export default ChatBox;
