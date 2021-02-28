const {
  users,
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./users');

const { addMessage, getMessagesByRoomId } = require('./messages');

module.exports = (io) => {
  const joinChat = function ({ username, roomId }, callback) {
    const socket = this; // hence the 'function' above, as an arrow function will not work
    const { user, error } = addUser({
      id: socket.id,
      username,
      roomId,
    });

    if (error) {
      return callback(error);
    }

    socket.emit('chatHistory', getMessagesByRoomId(user.roomId));

    socket.emit('message', {
      username: 'admin',
      text: `${user.username}, welcome to the room ${user.roomId}`,
    });

    socket.broadcast.to(user.roomId).emit('message', {
      username: 'admin',
      text: `${user.username}, has joined!`,
    });

    socket.join(user.roomId);

    io.to(user.roomId).emit('roomData', { users: getUsersInRoom(user.roomId) });

    console.log(`User ${username} was connected to the room ${roomId}.`);
    console.log(users);
  };

  const sendMessage = function (message, callback) {
    const socket = this;
    const user = getUser(socket.id);
    const messageToSend = {
      username: user.username,
      ...message,
    };
    io.to(user.roomId).emit('message', messageToSend);
    addMessage({ ...messageToSend, roomId: user.roomId });
    callback();
  };

  const disconnectUser = function () {
    const socket = this;
    const user = removeUser(socket.id);

    if (user) {
      console.log(`User ${user.username} was disconnected`);

      io.to(user.roomId).emit('message', {
        username: 'admin',
        text: `${user.username} has left...`,
      });
      io.to(user.roomId).emit('roomData', {
        users: getUsersInRoom(user.roomId),
      });
    }
  };

  return {
    joinChat,
    sendMessage,
    disconnectUser,
  };
};
