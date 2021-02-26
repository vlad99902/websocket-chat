import React, { useContext, useState } from 'react';
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

let socket;

export const ChatContainer = ({ location }) => {
  const { username } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const history = useHistory();
  useEffect(() => {
    const room = location.pathname.split('/')[2];

    socket = io('localhost:5000');
    socket.emit('join', { name: username, room }, () => {});

    return () => {
      socket.emit('disconnectUser');
      socket.off();
    };
  }, [location]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <Card>
      <ChatWrapper>
        <ChatHeader>
          <HeaderUserName>{username}</HeaderUserName>

          <ul>
            {users.map((user, i) => (
              <li key={i}>{i + 1 + ' ' + user.name}</li>
            ))}
          </ul>

          <BaseButton ml="auto" onClick={() => history.push('/')}>
            Logout
          </BaseButton>
        </ChatHeader>
        <Messages messages={messages} username={username} />
        <MessageInput>
          <BaseInput
            placeholder="Enter your message..."
            isValid={true}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <BaseButton ml="18px" onClick={sendMessage}>
            Send
          </BaseButton>
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

const HeaderUserName = styled.div`
  font-weight: 600;
  font-size: 1.125rem;
  margin-right: 16px;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;
