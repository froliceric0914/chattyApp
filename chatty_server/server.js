const express = require("express");
const WebSocket = require("ws");
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');
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


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      if (data){
        console.log(data);
        client.send(JSON.stringify(data));
      } else {
        const connectionNotice = {
          type: "connectionNotice",
          connected: wss.client.size
        };
         client.send(JSON.stringify(connectionNotice));
      }
    }
  });
};


function addID (message){
  message.id=uuidv4();
  return message;
}

wss.on("connection", ws => {
  //assign the uuid
  console.log("Client connected");
  // wss.broadcast();
  // ws.send();
  ws.on("message", incoming=(data) =>{
//push msg, add a uuid
    const message = JSON.parse(data);
    const messageWithId = addID(message)
    wss.broadcast(messageWithId)
    // console.log(message);
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => console.log("Client disconnected"));
});
