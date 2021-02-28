import styled from 'styled-components';
import { colors } from '../utils/colors';

import { Message } from '../components/Message';
import { animateScroll } from 'react-scroll';
import { useEffect } from 'react';

/**
 * Component to map messages array
 * @param {object} props - messages array and current user username
 */
export const Messages = ({ messages, username }) => {
  //scroll to bottom when new message received
  useEffect(() => {
    scrollToBottom();
  });

  //scroll to bottom of the element
  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: 'message-wrapper',
    });
  };

  return (
    <MessagesWrapper id="message-wrapper">
      {messages.map((message, i) => (
        <Message key={i} message={message} username={username} />
      ))}
    </MessagesWrapper>
  );
};

const MessagesWrapper = styled.div`
  border-radius: 16px;
  border: 1px solid ${colors.$gray};
  padding: 16px;

  width: 560px;
  height: 550px;

  @media (max-width: 1024px) {
    width: 450px;
  }

  @media (max-width: 768px) {
    width: 364px;
    height: 70vh;
  }

  @media (max-width: 425px) {
    width: 100%;
    height: 60vh;
  }

  overflow: scroll;
`;
