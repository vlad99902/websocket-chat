import { useState, useContext } from 'react';
import { uid } from 'uid';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { BaseButton } from '../components/BaseButton';
import { BaseInput } from '../components/BaseInput';
import { Container } from '../utils/primaryStyledComponents';
import { UserContext } from '../context/UserContext';

/**
 * Auth page
 */
export const AuthPage = () => {
  const history = useHistory();
  //context to store username, and can use it in every component
  const { setUsername, roomId, setRoomId } = useContext(UserContext);
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

    let authRoomId = roomId;
    //if no room create new
    if (!roomId) {
      authRoomId = uid();
      setRoomId(authRoomId);
    }

    //go to room page and save room info
    history.push(`/chat/${authRoomId}`);
    sessionStorage.setItem(
      authRoomId,
      JSON.stringify({ username: usernameInputValue, roomId: authRoomId }),
    );
  };

  /**
   * If value is empty returns false
   * @param {string} value
   */
  const checkValidInput = (value) => {
    if (!value || value.split(' ').length > 1 || value === 'admin') {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  };

  return (
    <AuthPageWrapper>
      <Container>
        <Header>
          <Title>Please enter your name to chat</Title>
          {roomId && <SubTitle>Room id: {roomId}</SubTitle>}
        </Header>
        <AuthForm onSubmit={onSumbitAuthForm}>
          <BaseInput
            maxWidth="450px"
            id="username"
            name="username"
            placeholder="Enter your name"
            value={usernameInputValue}
            isValid={isFormValid}
            onChange={onChangeInputUsernameHandler}
          />
          <BaseButton
            type="submit"
            mt="16px"
            disabled={!isFormValid || !usernameInputValue}
          >
            GO
          </BaseButton>
        </AuthForm>
      </Container>
    </AuthPageWrapper>
  );
};

const AuthPageWrapper = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
`;

const SubTitle = styled.h1`
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;

  margin-top: 16px;
`;

const AuthForm = styled.form`
  display: flex;

  flex-direction: column;
  align-items: center;
`;
