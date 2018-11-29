import React, { Component } from "react";

class Message extends Component {
  constructor() {
    super();
    // this.props.messageData;
  }

  render() {
    return (
      <tr>
        <td>{this.props.messageData.username}</td>
        <td>{this.props.messageData.content}</td>
      </tr>
    );
  }
}

export default Message;
