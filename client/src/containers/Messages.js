import styled from 'styled-components';
import { colors } from '../utils/colors';

import { Message } from '../components/Message';

/**
 * Component to map messages array
 * @param {object} props - messages array and current user username
 */
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
  border-radius: 16px;
  border: 1px solid ${colors.$gray};
  padding: 16px;

  overflow: scroll;
`;
