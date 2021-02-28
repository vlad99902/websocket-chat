const userStorage = require('../data/users');
const messagesStorage = require('../data/messages');

module.exports = (io) => {
  const joinChat = function ({ username, roomId }, callback) {
    const socket = this;

    //add user to local server storage
    const { user, error } = userStorage.addUser({
      id: socket.id,
      username,
      roomId,
    });

    //error handling
    if (error) {
      return callback(error);
    }

    //loading chat history
    socket.emit(
      'chatHistory',
      messagesStorage.getMessagesByRoomId(user.roomId),
    );

    //send system message
    socket.emit('message', {
      username: 'admin',
      text: `Welcome to the room ${user.roomId}`,
    });

    //send system message to other room users
    socket.broadcast.to(user.roomId).emit('message', {
      username: 'admin',
      text: `${user.username}, has joined!`,
    });

    //join
    socket.join(user.roomId);

    //send users in room
    io.to(user.roomId).emit('roomData', {
      users: userStorage.getUsersInRoom(user.roomId),
    });
  };

  const sendMessage = function (message, callback) {
    const socket = this;
    //get user from local store
    const user = userStorage.getUserById(socket.id);
    //make message to send
    const messageToSend = {
      username: user.username,
      ...message,
    };
    //send message to users in room
    io.to(user.roomId).emit('message', messageToSend);
    //add message to message storage
    messagesStorage.addMessage({ ...messageToSend, roomId: user.roomId });
    //to clear front end message
    callback();
  };

  const disconnectUser = function () {
    const socket = this;
    //remove user from local users storage
    const user = userStorage.removeUser(socket.id);

    //if this user was deleted send system message and new users counter
    if (user) {
      //left user admin message
      io.to(user.roomId).emit('message', {
        username: 'admin',
        text: `${user.username}, has left...`,
      });
      io.to(user.roomId).emit('roomData', {
        users: userStorage.getUsersInRoom(user.roomId),
      });
    }
  };

  return {
    joinChat,
    sendMessage,
    disconnectUser,
  };
};
