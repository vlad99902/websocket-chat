import { useState, useEffect, useContext } from 'react';

import { io } from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import { ENDPOINT } from '../utils/serverInfo';
import { UserContext } from '../context/UserContext';

//store socket
let socket;

/**
 * Use chat hook
 * @param {string} location
 */
export const useChat = (location) => {
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

    //get user data from session storage
    const localUserData = JSON.parse(sessionStorage.getItem(linkRoomId));
    let localUsername = username;

    //if userdata doesn't exists go to login page
    if (!username && !localUserData) {
      history.push('/');
      return () => {
        socket.off();
      };
    }

    //if userdata exists in session storage set username
    if (!username && localUserData) {
      localUsername = localUserData.username;
      setUsername(localUsername);
    }

    //load chat history for current room
    socket.on('chatHistory', (chatHistory) => {
      setMessages([...messages, ...chatHistory]);
    });

    //load online users
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    //join chat
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

    //off socket and disconnect on unmount
    return () => {
      socket.emit('disconnectUser');
      socket.off();
    };
  }, []);

  useEffect(() => {
    //if message sended, load it
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [messages]);

  /**
   * Function to send message
   * @param {} event
   */
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      const messageToSend = { text: message, sendTime: new Date() };
      socket.emit('sendMessage', messageToSend, () => setMessage(''));
    }
  };

  /**
   * Function to logout user
   * @param {string} roomId
   */
  const logoutHandler = (roomId) => {
    sessionStorage.removeItem(roomId);
    setRoomId('');
    history.push('/');
  };

  return {
    sendMessage,
    logoutHandler,
    setMessage,
    username,
    users,
    roomId,
    messages,
    message,
  };
};
