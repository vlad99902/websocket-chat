class Messages {
  //store messages
  messages = [];

  //get all messages list
  get getMessages() {
    return this.messages;
  }

  //get messages by room
  getMessagesByRoomId(roomId) {
    return this.messages.filter((message) => message.roomId === roomId);
  }

  //add message to store
  addMessage(message) {
    return this.messages.push(message);
  }
}

module.exports = new Messages();
