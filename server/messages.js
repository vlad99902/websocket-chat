messages = [];

const getMessages = () => messages;
const getMessagesByRoomId = (roomId) =>
  messages.filter((message) => message.roomId === roomId);
const addMessage = (message) => messages.push(message);
const removeMessagesByRoomId = (roomId) =>
  (messages = messages.filter((message) => message.roomId !== roomId));

module.exports = {
  getMessages,
  addMessage,
  getMessagesByRoomId,
  removeMessagesByRoomId,
};
