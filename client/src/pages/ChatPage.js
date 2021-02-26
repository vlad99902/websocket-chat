import styled from 'styled-components';
import { Container } from '../utils/primaryStyledComponents';
import { ChatContainer } from '../containers/ChatContainer';

export const ChatPage = ({ location }) => {
  return (
    <ChatPageWrapper>
      <Container>
        <ChatContainer location={location} />
      </Container>
    </ChatPageWrapper>
  );
};

const ChatPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`;
