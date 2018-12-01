import React, { Component } from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this._handleContent = this._handleContent.bind(this);
    this._handleUsername = this._handleUsername.bind(this);
  }

  //declare the method to change the state of the parent
  // submitMessage(evt) {
  //   evt.preventDefault(evt);
  //   this.props.newMessage(this.props.name, this.state.content);
  //   //actions up
  //   this.setState({ name: "", content: "" });
  // }

  //listen to the content msg field once enter
  _handleContent(e) {
    console.log(e);
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
          // placeholder={placeholderM}
        />
        <input
          className="chatbar-message"
          type="text"
          // onChange={this.contentHandler}
          placeholder="Type a message and hit Enter"
          onKeyPress={this._handleContent}
          //listen to the change
        />
      </footer>
    );
  }
}

export default ChatBar;
