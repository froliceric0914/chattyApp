import React, { Component } from "react";

class Message extends Component {
  constructor() {
    super();
    // this.props.messageData;
  }

  render() {
    // function validUser() {
    //   if (this.pros.messageData.username) {
    //     const username = this.props.messageData.username;
    //     const content = this.props.messageData.conten;
    //     return;
    //   }
    // }
    return (
      <tr>
        <td>{this.props.messageData.username}</td>
        <td>{this.props.messageData.content}</td>
      </tr>
    );
  }
}

export default Message;
