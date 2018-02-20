import React from 'react';

class ChatList extends React.Component {

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollTop = this.el.scrollHeight;
  }

  render() {
    return (
      <div ref={el => { this.el = el; }} className="chatList">
        {this.props.messages.map(function(message, index){
          if (message.origin == "server") {
            return <div className={message.origin} key={index}><p>{message.body}</p></div>
          } else {
            return (
              <div className={message.origin} key={index}>
                <div className="name"><h4>{message.origin}</h4></div>
                <div className="message"><p>{message.body}</p></div>
              </div>
            )
          }
        })}
      </div>
    )
  }
}

export default ChatList;
