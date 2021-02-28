import React, { useMemo, useState } from 'react';

export const UserContext = React.createContext();

/**
 * UserInfo context. Username, roomId and error can be used in every component.
 * @param {React.ReactNode} {children}
 */
export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [globalError, setGlobalError] = useState('');

  const userContextValue = useMemo(
    () => ({
      username,
      setUsername,
      roomId,
      setRoomId,
      globalError,
      setGlobalError,
    }),
    [username, setUsername, roomId, setRoomId, globalError, setGlobalError],
  );

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
