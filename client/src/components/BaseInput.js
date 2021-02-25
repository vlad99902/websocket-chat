import styled from 'styled-components';
import { colors } from '../utils/colors';

export const BaseInput = ({ mt, ml, ...rest }) => {
  return <InputArea mt ml {...rest} />;
};

const InputArea = styled.input`
  margin-top: ${(props) => props.mt};
  margin-left: ${(props) => props.ml};
  max-width: ${(props) => props.maxWidth};

  display: block;
  width: 100%;

  font-size: 0.875rem;
  font-family: 'Jetbrains mono';
  padding: 8px 12px;
  background-color: ${colors.$white};
  border-radius: 14px;
  border: 1px solid ${colors.$gray};
  color: ${colors.$black};
  outline: none;

  :focus {
    border: 1px solid ${colors.$black};
    /* outline: 1px solid ${colors.$black}; */
  }

  ::placeholder {
    color: ${colors.$gray};
  }
`;
