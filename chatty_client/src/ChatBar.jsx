import React, { Component } from "react";
import { generateRandomId } from "./utils";

class ChatBar extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = { name: "", content: "" };
  //   // this.subMessage = this.submitMessage.bind(this);
  //   // this.nameHandler = this.nameHandler.bind(this);
  //   // this.contentHandler = this.contentHandler.bind(this);
  //   // this._handleKeyPress = this._handleKeyPress.bind(this);
  // }

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
  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.props.newMessage(e.target.value);
    }
  };

  /*controlled component,value={this.state.content},re-render the value after re-setState */
  render() {
    // const placeholderM = { this.props.currentUser.name }
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          type="text"
          // placeholder={placeholderM}
        />
        <input
          className="chatbar-message"
          type="text"
          // onChange={this.contentHandler}
          placeholder="Type a message and hit Enter"
          onKeyPress={this._handleKeyPress}
          //listen to the change
        />
      </footer>
    );
  }
}

export default ChatBar;
