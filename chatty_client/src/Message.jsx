import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td
          className="userName"
          style={{ color: this.props.messageData.color }}
        >
          {this.props.messageData.username || ""}
        </td>
        <td>{this.props.messageData.content}</td>
      </tr>
    );
  }
}

export default Message;
