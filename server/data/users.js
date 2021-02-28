class Users {
  //array to store users
  users = [];

  /**
   * Method to add new user. Returns error if it's necessary
   * @param {*} userParamsObject
   */
  addUser({ id, username, roomId }) {
    if (!username || !roomId) return { error: 'Username are required.' };
    //if user with this username exists in this roomId
    const existingUser = this.users.find(
      (user) => user.roomId === roomId && user.username === username,
    );
    if (existingUser) return { error: 'Username is taken in this room.' };

    const user = { id, username, roomId };
    this.users.push(user);
    return { user };
  }

  /**
   * Method to remove user from users storage
   * @param {string} id
   */
  removeUser(id) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
  }

  /**
   * Method to get user by id
   * @param {string} id
   */
  getUserById(id) {
    return this.users.find((user) => user.id === id);
  }

  /**
   * Method to get users array by room
   * @param {string} roomId
   */
  getUsersInRoom(roomId) {
    return this.users.filter((user) => user.roomId === roomId);
  }
}

module.exports = new Users();
