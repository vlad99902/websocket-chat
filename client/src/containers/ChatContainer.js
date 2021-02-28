import styled from 'styled-components';

import { BaseButton } from '../components/BaseButton';
import { BaseInput } from '../components/BaseInput';
import { Card } from '../utils/primaryStyledComponents';
import { Messages } from '../containers/Messages';
import { UsersList } from './UsersList';
import { useChat } from '../hooks/useChat';

/**
 * Component to control all chat component
 * @param {object} param0
 */
export const ChatContainer = ({ location }) => {
  const {
    sendMessage,
    logoutHandler,
    setMessage,
    username,
    users,
    roomId,
    messages,
    message,
  } = useChat(location);

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

  @media (max-width: 620px) {
    margin-bottom: 12px;
  }
`;

const MessagesAndInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
