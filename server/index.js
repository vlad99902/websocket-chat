const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const {
  users,
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  isRoomCreated,
} = require('./users');

const app = express();
app.use(cors);

const PORT = process.env.PORT || 5000;

const server = require('http').createServer(app);

const io = socketio(server, {
  cors: {
    origin: 'http://192.168.31.58:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  const currentUserId = socket.id;

  socket.on('join', ({ username, roomId }, callback) => {
    //check was room created earlier or not
    const wasRoomCreated = isRoomCreated(roomId);
    //create new user object and save
    const { user, error } = addUser({
      id: socket.id,
      username,
      roomId,
    });

    if (error) {
      return callback(error);
    }

    socket.emit('message', {
      username: 'admin',
      text: `${user.username}, welcome to the room ${user.roomId}`,
    });

    socket.broadcast.to(user.roomId).emit('message', {
      username: 'admin',
      text: `${user.username}, has joined!`,
    });

    socket.join(user.roomId);

    console.log(
      `User ${username} was connected to the room ${roomId}. ${wasRoomCreated}`,
    );
    console.log(users);
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.roomId).emit('message', {
      username: user.username,
      text: message,
    });
    io.to(user.roomId).emit('roomData', { roomId: user.roomId, text: message });
    callback();
  });

  socket.on('disconnectUser', () => {
    const user = removeUser(currentUserId);

    console.log(socket.id, currentUserId, user);

    if (user) {
      console.log(`User ${user.username} was disconnected`);

      io.to(user.roomId).emit('message', {
        user: 'admin',
        text: `${user.username} has left`,
      });
    }
  });
});

app.get('/', (req, res) =>
  res.send('Server is still running, but route not found'),
);

server.listen(PORT, () =>
  console.log(`Server has been started on port ${PORT}`),
);
