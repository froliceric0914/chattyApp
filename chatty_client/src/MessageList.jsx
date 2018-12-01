import React, { Component } from "react";
import Message from "./Message.jsx";
//how the msglist and msg connected together?????
class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const messageList = this.props.messages.map(message => {
      return <Message messageData={message} key={message.id} />;
    });

    //seperate the username and content
    return (
      <div className="message">
        <table className="msgTable">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Content</th>
            </tr>
            {messageList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MessageList;
