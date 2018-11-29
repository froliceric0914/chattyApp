import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import NaviBar from "./NaviBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Eric" },
      messages: []
    };
    this.newMessage = this.newMessage.bind(this);
    this.noteNameChange = this.noteNameChange.bind(this);
  }
  //data down to the child: chatBar
  //send message to the server
  newMessage(content) {
    const newMessage = {
      username: this.state.currentUser.name,
      content: content // shall receive from the chatbar
    };
    //change the state of current name from the input
    this.socket.send(JSON.stringify(newMessage));
  }

  noteNameChange(newName, oldName) {
    this.setState({ currentUser: { name: newName } });
    const newMessage = {
      content: `Notice: the ${oldName} changed to the ${newName}`
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    //connect to the server
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = event => {
      // console.log("Connected to server");
    };
    this.socket.onmessage = event => {
      const message = JSON.parse(event.data);
      console.log(message);
      this.setState({ messages: [...this.state.messages, message] });
    };
  }
  //

  render() {
    return (
      <div>
        <NaviBar />
        <ChatBar
          newMessage={this.newMessage}
          currentUser={this.state.currentUser.name}
          noteNameChange={this.noteNameChange}
        />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}

export default App;
