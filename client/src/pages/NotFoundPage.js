import styled from 'styled-components';
import { BaseButton } from '../components/BaseButton';
import { Container } from '../utils/primaryStyledComponents';
import { useHistory } from 'react-router-dom';

/**
 * 404 not found page
 */
export const NotFoundPage = () => {
  const history = useHistory();

  return (
    <ErrorPageWrapper>
      <Container>
        <ErrorPageInner>
          <ErrorText>
            <ErrorCode>404!</ErrorCode> The page could not be found!
          </ErrorText>
          <BaseButton onClick={() => history.push('/')}>Go home</BaseButton>
        </ErrorPageInner>
      </Container>
    </ErrorPageWrapper>
  );
};

const ErrorPageWrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
`;

const ErrorPageInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorText = styled.h1`
  font-size: 2rem;
  margin-bottom: 32px;
`;

const ErrorCode = styled.span`
  font-size: 3.375rem;
  font-weight: 600;
`;
