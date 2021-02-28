const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const ENDPOINT = require('./utils/serverInfo');

const app = express();
app.use(cors);

const PORT = process.env.PORT || 5000;

const server = require('http').createServer(app);

const io = socketio(server, {
  cors: {
    origin: ENDPOINT,
    methods: ['GET', 'POST'],
  },
});

const {
  joinChat,
  sendMessage,
  disconnectUser,
} = require('./controller/chatHandler.js')(io);

const onConnection = (socket) => {
  socket.on('join', joinChat);
  socket.on('sendMessage', sendMessage);
  socket.on('disconnect', disconnectUser);
  socket.on('disconnectUser', disconnectUser);
};

io.on('connection', onConnection);

app.get('/', (req, res) =>
  res.send('Server is still running, but route not found'),
);

server.listen(PORT, () =>
  console.log(`Server has been started on port ${PORT}`),
);
