import React, { Component } from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this._handleContent = this._handleContent.bind(this);
    this._handleUsername = this._handleUsername.bind(this);
  }
  //listen to the content msg field once enter
  _handleContent(e) {
    if (e.key === "Enter") {
      this.props.newMessage(e.target.value);
      e.target.value = "";
    }
  }

  _handleUsername(e) {
    if (e.key === "Enter" && e.target.value !== this.props.currentUser.name) {
      this.props.newUser(e.target.value, this.props.currentUser.name);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          type="text"
          onKeyPress={this._handleUsername}
          placeholder="Your Name (Optional)"
        />
        <input
          className="chatbar-message"
          type="text"
          placeholder="Type a message and hit Enter"
          //listen to the change
          onKeyPress={this._handleContent}
        />
      </footer>
    );
  }
}

export default ChatBar;
