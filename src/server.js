const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Import cors

const app = express();
app.use(cors()); // Use cors
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000", // Allow only this origin
        methods: ["GET", "POST"],
      }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // Send random data every 2 seconds
    setInterval(() => {
        const data = Math.floor(Math.random() * 100);
        socket.emit('data', data);
    }, 2000);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});
