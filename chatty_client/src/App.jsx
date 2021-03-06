import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import NaviBar from "./NaviBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: "Anonymous",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      },
      messages: [],
      connectedUsers: 0
    };
    this.newMessage = this.newMessage.bind(this);
    this.newUser = this.newUser.bind(this);
  }

  newMessage(content) {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      color: this.state.currentUser.color,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  newUser(newName, oldName) {
    //send the new name to the server
    const newMessage = {
      content: `User ${oldName} has changes to his/her name to ${newName} `,
      type: "postNotification"
    };
    console.log("change user: ", newName);
    this.setState({
      currentUser: { name: newName, color: this.state.currentUser.color }
    });
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    //connect to the server
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = event => {
      console.log("Connected to server");
    };

    this.socket.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.type === "connectionNotice") {
        this.setState({ connectedUsers: message.connected });
      } else {
        switch (message.type) {
          case "incomingMessage":
            this.setState({ messages: [...this.state.messages, message] });
            break;
          case "incomingNotification":
            this.setState({ messages: [...this.state.messages, message] });
            break;
          default:
            // show an error in the console if the message type is unknown
            throw new Error("Unknown event type " + message.type);
        }
      }
    };
  }

  render() {
    return (
      <div>
        <NaviBar connectedUsers={this.state.connectedUsers} />
        <MessageList messages={this.state.messages} />
        <ChatBar
          newUser={this.newUser}
          newMessage={this.newMessage}
          currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}

export default App;
