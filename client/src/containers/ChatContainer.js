import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router-dom';

import { BaseButton } from '../components/BaseButton';
import { BaseInput } from '../components/BaseInput';
import { Card } from '../utils/primaryStyledComponents';
import { Messages } from '../containers/Messages';
import { UserContext } from '../context/UserContext';
import { ENDPOINT } from '../utils/serverInfo';
import { UsersList } from './UsersList';

let socket;

export const ChatContainer = ({ location }) => {
  const {
    username,
    setUsername,
    roomId,
    setRoomId,
    setGlobalError,
  } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const history = useHistory();

  /**
   * Effect when page mount
   */
  useEffect(() => {
    socket = io(ENDPOINT);
    //get room id from path
    const linkRoomId = location.pathname.split('/')[2];

    setRoomId(linkRoomId);

    const localUserData = JSON.parse(sessionStorage.getItem(linkRoomId));

    let localUsername = username;

    if (!username && !localUserData) {
      history.push('/');
      return () => {
        socket.off();
      };
    }

    if (!username && localUserData) {
      localUsername = localUserData.username;
      setUsername(localUsername);
    }

    socket.on('chatHistory', (chatHistory) => {
      setMessages([...messages, ...chatHistory]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    socket.emit(
      'join',
      { username: localUsername, roomId: linkRoomId },
      (error) => {
        if (error) {
          setGlobalError(error);
          history.push('/');
          sessionStorage.removeItem(roomId);
        }
      },
    );

    return () => {
      socket.emit('disconnectUser');
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      const messageToSend = { text: message, sendTime: new Date() };
      socket.emit('sendMessage', messageToSend, () => setMessage(''));
    }
  };

  const logoutHandler = (roomId) => {
    sessionStorage.removeItem(roomId);
    setRoomId('');
    history.push('/');
  };

  return (
    <Card>
      <ChatWrapper>
        <ChatHeader>
          <HeaderUserName>{username}</HeaderUserName>

          <BaseButton ml="auto" onClick={() => logoutHandler(roomId)}>
            Logout
          </BaseButton>
        </ChatHeader>
        <MessagesAndInfoWrapper>
          <UsersListWrapper>
            <UsersList users={users} currentUsername={username}></UsersList>
          </UsersListWrapper>
          <Messages messages={messages} username={username} />
        </MessagesAndInfoWrapper>
        <MessageInput onSubmit={sendMessage}>
          <BaseInput
            placeholder="Enter your message..."
            isValid={true}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <BaseButton
            ml="18px"
            type="submit"
            disabled={!message}
            variant="submit"
          >
            Send
          </BaseButton>
        </MessageInput>
      </ChatWrapper>
    </Card>
  );
};

const ChatWrapper = styled.div`
  max-width: 800px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UsersListWrapper = styled.div`
  margin-right: 16px;
`;

const MessagesAndInfoWrapper = styled.div`
  display: flex;
  height: 550px;
`;

const MessageInput = styled.form`
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
