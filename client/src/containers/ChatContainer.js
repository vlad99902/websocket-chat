import React, { useContext } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
// import queryString from 'query-string';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router-dom';

import { BaseButton } from '../components/BaseButton';
import { BaseInput } from '../components/BaseInput';
import { Card } from '../utils/primaryStyledComponents';
import { Messages } from '../containers/Messages';
import { UserContext } from '../context/UserContext';

export const ChatContainer = ({ location }) => {
  const { username } = useContext(UserContext);

  const history = useHistory();
  // useEffect(() => {
  //   const room = location.pathname.split('/')[2];

  //   let socket;
  //   socket = io('localhost:5000');
  //   console.log(socket);

  //   const localStorageCurrentRoom = JSON.parse(
  //     localStorage.getItem(`userDataRoom${room}`),
  //   );
  //   console.log(localStorageCurrentRoom);

  //   if (localStorageCurrentRoom) {
  //     socket.emit(
  //       'join',
  //       { name: localStorageCurrentRoom.username, room },
  //       () => {},
  //     );
  //   } else history.push('/');

  //   return () => {
  //     socket.emit('disconnect');

  //     socket.off();
  //   };
  // }, [location.search]);

  return (
    <Card>
      <ChatWrapper>
        <h1>{username}</h1>
        <BaseButton ml="auto" onClick={() => history.push('/')}>
          Logout
        </BaseButton>
        <Messages />
        <MessageInput>
          <BaseInput placeholder="Enter your message..." />
          <BaseButton ml="18px">Send</BaseButton>
        </MessageInput>
      </ChatWrapper>
    </Card>
  );
};

const ChatWrapper = styled.div`
  width: 600px;
  height: 400px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MessageInput = styled.div`
  display: flex;
  margin-top: 18px;
`;
