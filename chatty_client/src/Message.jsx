import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
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
        <td style={{ color: this.props.messageData.color }}>
          {this.props.messageData.username || ""}
        </td>
        {console.log("what???", this.props.messageData)}
        <td>{this.props.messageData.content}</td>
      </tr>
    );
  }
}

export default Message;
