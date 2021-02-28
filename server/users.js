const users = [];

const addUser = ({ id, username, roomId }) => {
  if (!username || !roomId)
    return { error: 'Username and roomId are required.' };

  //if user with this username exists in this roomId
  const existingUser = users.find(
    (user) => user.roomId === roomId && user.username === username,
  );

  if (existingUser) return { error: 'Username is taken.' };

  const user = { id, username, roomId };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (roomId) =>
  users.filter((user) => user.roomId === roomId);

module.exports = {
  users,
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
