import { useState, useContext } from 'react';
import io from 'socket.io-client';
import { uid } from 'uid';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { BaseButton } from '../components/BaseButton';
import { BaseInput } from '../components/BaseInput';
import { Container } from '../utils/primaryStyledComponents';
import { UserContext } from '../context/UserContext';

export const AuthPage = () => {
  const history = useHistory();
  //context to store username, and can use it in every component
  const { setUsername } = useContext(UserContext);
  const [usernameInputValue, setUsernameInputValue] = useState('');
  //state to check valid form or not
  const [isFormValid, setIsFormValid] = useState(true);

  //get new username on change input value
  const onChangeInputUsernameHandler = (event) => {
    setUsernameInputValue(event.target.value);
    checkValidInput(event.target.value);
  };

  /**
   * Sumbit auth form
   * @param  event
   */
  const onSumbitAuthForm = (event) => {
    event.preventDefault();
    setUsernameInputValue('');
    setUsername(usernameInputValue);

    // const roomId = uid();
    const roomId = '0cc70ad7df3';
    history.push(`/chat/${roomId}`);
    localStorage.setItem(
      `userDataRoom${roomId}`,
      JSON.stringify({ username: usernameInputValue, roomId }),
    );
  };

  /**
   * If value is empty returns false
   * @param {string} value
   */
  const checkValidInput = (value) => {
    if (!value) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  };

  return (
    <AuthPageWrapper>
      <Container>
        <Header>Please enter your name to chat</Header>
        <AuthForm onSubmit={onSumbitAuthForm}>
          <BaseInput
            maxWidth="450px"
            id="username"
            name="username"
            placeholder="Name"
            value={usernameInputValue}
            isValid={isFormValid}
            onChange={onChangeInputUsernameHandler}
          />
          <BaseButton type="submit" mt="16px" disabled={!isFormValid}>
            GO
          </BaseButton>
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
