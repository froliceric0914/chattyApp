const express = require("express");
const WebSocket = require("ws");
const SocketServer = WebSocket.Server;
const uuidv4 = require("uuid/v4");
// set the uuid
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

// send the msg back to client
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      if (data) {
        client.send(JSON.stringify(data));
      } else {
        const connectionNotice = {
          type: "connectionNotice",
          connected: wss.clients.size
        };
        client.send(JSON.stringify(connectionNotice));
      }
    }
  });
};

//attach an unique id to all the
function addID(message) {
  message.id = uuidv4();
  return message;
}

wss.on("connection", ws => {
  console.log("Client connected");

  //broadcast the set of online user
  wss.broadcast();

  ws.on(
    "message",
    (incoming = data => {
      const message = JSON.parse(data);

      //classify the msg/notification
      switch (message.type) {
        case "postMessage":
          message.type = "incomingMessage";
          break;
        case "postNotification":
          message.type = "incomingNotification";
      }
      //attach an unique id
      const messageWithId = addID(message);
      wss.broadcast(messageWithId);
    })
  );
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    //update the online user when close the page
    wss.broadcast();
    console.log("Client disconnected");
  });
});
