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
      }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      connectedUsers: 0
    };
    this.newMessage = this.newMessage.bind(this);
    this.newUser = this.newUser.bind(this);
  }
  //data down to the child: chatBar
  //send message to the server
  //I think need to change the color here
  newMessage(content) {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      color: this.state.currentUser.color,
      content: content
    };
    // console.log("color: ", `i want to change color to ${newMessage.color}`);
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
      // console.log("message from server", message);
      if (message.type === "connectionNotice") {
        this.setState({ connectedUsers: message.connected });
        // console.log("online users", this.state.connectedUsers);
      } else {
        switch (message.type) {
          case "incomingMessage":
            this.setState({ messages: [...this.state.messages, message] });
            console.log("incomingMSG: ", this.state.messages);
            break;
          case "incomingNotification":
            // this.setState({
            //   currentUser: { name: this.state.currentUser.name }
            // });
            this.setState({ messages: [...this.state.messages, message] });
            console.log(this.state.currentUser.name);
            break;
          default:
            // show an error in the console if the message type is unknown
            throw new Error("Unknown event type " + message.type);
        }
      }

      // this.setState({ messages: [...this.state.messages, message] });
    };
  }
  //

  render() {
    return (
      <div>
        <NaviBar connectedUsers={this.state.connectedUsers} />
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
