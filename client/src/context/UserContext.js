import React, { useMemo, useState } from 'react';

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');

  const userContextValue = useMemo(
    () => ({ username, setUsername, roomId, setRoomId }),
    [username, setUsername, roomId, setRoomId],
  );

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
