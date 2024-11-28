//node server which will handel socket connections
const express = require("express");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

// Create an Express app
const app = express();

// Allow CORS for frontend access
app.use(
    cors({
        origin: ["http://localhost:8080", "https://chat-application-web-frontend.vercel.app/"],
    })
);

// Serve static files for frontend (if needed)
app.use(express.static(__dirname));

// Create an HTTP server and pass it to the WebSocket server
const server = http.createServer(app);

// Set up the WebSocket server
const wss = new WebSocket.Server({ server });
const users = {};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    });
})