import styled from 'styled-components';
import { BaseButton } from '../components/BaseButton';
import { BaseInput } from '../components/BaseInput';
import { Card } from '../utils/primaryStyledComponents';
import { Messages } from '../containers/Messages';

export const ChatContainer = () => {
  return (
    <Card>
      <ChatWrapper>
        <BaseButton ml="auto">Logout</BaseButton>
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
