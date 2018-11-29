import React, { Component } from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    //   // this.state = { name: "", content: "" };
    //   // this.subMessage = this.submitMessage.bind(this);
    //   // this.nameHandler = this.nameHandler.bind(this);
    //   // this.contentHandler = this.contentHandler.bind(this);
    this._handleContent = this._handleContent.bind(this);
    this._handleUsername = this._handleUsername.bind(this);
  }

  //controlled component
  // nameHandler(e) {
  //   this.setState({ name: e.target.value });
  // }
  // contentHandler(e) {

  // }

  //declare the method to change the state of the parent
  // submitMessage(evt) {
  //   evt.preventDefault(evt);
  //   this.props.newMessage(this.props.name, this.state.content);
  //   //actions up
  //   this.setState({ name: "", content: "" });
  // }

  //listen to the content msg field once enter
  _handleContent(e) {
    if (e.key === "Enter") {
      this.props.newMessage(e.target.value);
    }
  }

  _handleUsername(e) {
    if (e.key === "Enter" && e.target.value !== this.props.currentUser) {
      this.props.noteNameChange(e.target.value, this.props.currentUser);
    }
  }

  /*controlled component,value={this.state.content},re-render the value after re-setState */
  render() {
    // const placeholderM = { this.props.currentUser.name }
    //need to trigger an event to read from input field
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          type="text"
          placeholder={this.props.currentUser.name}
          onKeyPress={this._handleUsername}
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
