messages = [];

const getMessages = () => messages;
const getMessagesByRoomId = (roomId) =>
  messages.filter((message) => message.roomId === roomId);
const addMessage = (message) => messages.push(message);

module.exports = { getMessages, addMessage, getMessagesByRoomId };
