import styled from 'styled-components';
import { colors } from '../utils/colors';

export const BaseButton = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  margin-top: ${(props) => props.mt};
  margin-left: ${(props) => props.ml};

  color: ${colors.$white};
  cursor: pointer;
  user-select: none;
  background-color: ${colors.$pink};
  border: 1px solid ${colors.$pink};
  font-family: 'Jetbrains mono';
  padding: 10px 15px;
  border-radius: 16px;
  font-size: 1rem;

  :focus {
    border: 1px solid ${colors.$black};
  }

  :disabled {
    cursor: not-allowed;
  }
`;
