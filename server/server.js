const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/chat', { useNewUrlParser: true, useUnifiedTopology: true });

// Serve static files
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (data) => {
    socket.join(data.room);
    socket.broadcast.to(data.room).emit('message', {
      user: 'admin',
      text: `${data.user} has joined the chat`
    });
  });

  socket.on('sendMessage', (message, callback) => {
    io.to(message.room).emit('message', { user: message.user, text: message.text });
    callback();
  });

  socket.on('disconnect', () => {
    console.log('User had left');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
