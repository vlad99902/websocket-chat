import styled from 'styled-components';
import { colors } from '../utils/colors';

export const Message = ({ message, username }) => {
  return (
    <MessageWrapper currentUser={username === message.username}>
      <Author>{message.username}</Author>
      <MessageText>{message.text}</MessageText>
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div`
  max-width: 330px;

  border-radius: 12px;
  background-color: ${(props) =>
    props.currentUser ? colors.$blue + '; margin-left: auto' : colors.$gray};

  padding: 12px;
  margin-top: 12px;

  :first-child {
    margin-top: 0;
  }
`;

const Author = styled.h3`
  font-size: 0.875rem;
  font-weight: 300;
  color: ${colors.$darkGray};
`;

const MessageText = styled.p`
  font-size: 0.875rem;
  font-weight: 300;
  color: ${colors.$black};
`;
