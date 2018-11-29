import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import NaviBar from "./NaviBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Eric" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.newMessage = this.newMessage.bind(this);
    this.newUser = this.newUser.bind(this);
  }
  //data down to the child: chatBar
  //send message to the server
  newMessage(content) {
    const newMessage = {
      username: this.state.currentUser.name,
      content: content // shall receive from the chatbar
    };

    this.socket.send(JSON.stringify(newMessage));
  }

  newUser(newName, oldName) {
    const newMessage = {
      content: `Notice: the username, ${oldName}, has changes to username: ${newName} `
    };

    this.socket.send(JSON.stringify(newMessage));
    this.setState({ currentUser: { name: newName } });
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
          currentUser={this.state.currentUser}
          newUser={this.newUser}
        />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}

export default App;
