import styled from 'styled-components';
import { colors } from '../utils/colors';

import { Message } from '../components/Message';

export const Messages = ({ messages, username }) => {
  return (
    <MessagesWrapper>
      {messages.map((message, i) => (
        <Message key={i} message={message} username={username} />
      ))}
    </MessagesWrapper>
  );
};

const MessagesWrapper = styled.div`
  height: 100%;
  border-radius: 16px;
  border: 1px solid ${colors.$gray};
  padding: 16px;

  overflow: scroll;
`;
