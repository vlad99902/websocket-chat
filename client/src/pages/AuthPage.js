import React from 'react';
import styled from 'styled-components';

import { BaseButton } from '../components/BaseButton';
import { BaseInput } from '../components/BaseInput';
import { Container } from '../utils/primaryStyledComponents';

export const AuthPage = () => {
  return (
    <AuthPageWrapper>
      <Container>
        <Header>Please enter your name to chat</Header>
        <AuthForm>
          <BaseInput placeholder="Name" maxWidth="450px" />
          <BaseButton mt="16px">GO</BaseButton>
        </AuthForm>
      </Container>
    </AuthPageWrapper>
  );
};

const AuthPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;

  margin-bottom: 32px;
`;

const AuthForm = styled.form`
  display: flex;

  flex-direction: column;
  align-items: center;
`;
