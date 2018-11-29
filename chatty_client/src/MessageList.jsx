//map over the this.props.messages
//for each of the message,
//return a component of Message, that taks a prop(message),

import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
  constructor(props) {
    super(props);
    // this.state = {};
  }

  render() {
    console.log(this.props.messages);
    const messageList = this.props.messages
      //   .filter(message => message.type === "incomingMessage")
      .map(message => {
        // console.log(message);
        return <Message messageData={message} key={message.id} />;
      });

    // }
    //seperate the username and content
    return (
      <div className="message">
        <table>
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
