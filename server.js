// server.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const users = [];

io.on('connection', socket => {
  console.log('User connected');

  // Add user to the list
  socket.on('join', username => {
    const user = { id: socket.id, username };
    users.push(user);
    io.emit('updateUsers', users);
  });

  // Listen for new messages
  socket.on('sendMessage', message => {
    const user = users.find(u => u.id === socket.id);
    if (user) {
      const timestamp = new Date().toLocaleTimeString();
      io.emit('newMessage', { username: user.username, text: message.text, timestamp });
    }
  });

  // Remove user from the list on disconnect
  socket.on('disconnect', () => {
    const index = users.findIndex(u => u.id === socket.id);
    if (index !== -1) {
      users.splice(index, 1);
      io.emit('updateUsers', users);
    }
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

