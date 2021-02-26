import React, { useMemo, useState } from 'react';

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  // const [connection, setConnection] = useState(null);

  const userContextValue = useMemo(() => ({ username, setUsername }), [
    username,
    setUsername,
  ]);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
