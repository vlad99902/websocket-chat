const {
  users,
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./users');

const {
  addMessage,
  getMessagesByRoomId,
  removeMessagesByRoomId,
} = require('./messages');

module.exports = (io) => {
  const joinChat = function ({ username, roomId }, callback) {
    const socket = this;

    //add user to local server storage
    const { user, error } = addUser({
      id: socket.id,
      username,
      roomId,
    });

    //error handling
    if (error) {
      return callback(error);
    }

    //loading chat history
    socket.emit('chatHistory', getMessagesByRoomId(user.roomId));
    console.log(getMessagesByRoomId(user.roomId));

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
    io.to(user.roomId).emit('roomData', { users: getUsersInRoom(user.roomId) });
  };

  const sendMessage = function (message, callback) {
    const socket = this;
    //get user from local store
    const user = getUser(socket.id);
    //make message to send
    const messageToSend = {
      username: user.username,
      ...message,
    };
    //send message to users in room
    io.to(user.roomId).emit('message', messageToSend);
    //add message to message storage
    addMessage({ ...messageToSend, roomId: user.roomId });
    //to clear front end message
    callback();
  };

  const disconnectUser = function () {
    const socket = this;
    //remove user from local users storage
    const user = removeUser(socket.id);

    //if this user was deleted send system message and new users counter
    if (user) {
      //message history clear if no users in room
      const usersInRoom = getUsersInRoom(user.roomId);
      if (!usersInRoom.length) removeMessagesByRoomId(user.roomId);
      //left user admin message
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
