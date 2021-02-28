import styled from 'styled-components';
import { colors } from '../utils/colors';
import { dateToHumanFormat } from '../utils/dateAndTime';

/**
 * Component to correctly render message and sustem notification
 * @param {object} props - message, current user username
 */
export const Message = ({ message, username }) => {
  return (
    <MessageWrapper
      currentUser={username === message.username}
      type={message.username}
    >
      {message.username !== 'admin' ? (
        <>
          <MessageInfoWrapper>
            <Author>{message.username}</Author>
            <MessageTime>{dateToHumanFormat(message.sendTime)}</MessageTime>
          </MessageInfoWrapper>
          <MessageText>{message.text}</MessageText>
        </>
      ) : (
        <>
          <AdminMessageText>{message.text}</AdminMessageText>
        </>
      )}
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div`
  max-width: 330px;

  border-radius: 12px;
  background-color: ${(props) =>
    props.currentUser ? colors.$blue + '; margin-left: auto' : colors.$gray};

  ${(props) => {
    if (props.type === 'admin')
      return 'background-color: #ffffff; max-width: 100%; text-align: center;';
  }}

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

const MessageInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  margin-bottom: 3px;
`;

const MessageText = styled.p`
  font-size: 0.875rem;
  font-weight: 300;
  color: ${colors.$black};
`;

const MessageTime = styled.h4`
  font-size: 0.75rem;
  font-weight: 300;
  color: ${colors.$darkGray};
`;

const AdminMessageText = styled.h4`
  font-size: 0.875rem;
  font-weight: 300;
  color: ${colors.$gray};
`;
