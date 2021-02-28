import styled from 'styled-components';
import { colors } from '../utils/colors';

/**
 * Base input component
 * @param {object} param0
 */
export const BaseInput = ({ mt, ml, isValid, ...rest }) => {
  return <InputArea mt={mt} ml={ml} isValid={isValid} {...rest} />;
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

  ${(props) =>
    !props.isValid
      ? `border: 1px solid ${colors.$red}`
      : `border: 1px solid ${colors.$gray}`};
  color: ${colors.$black};
  outline: none;

  :focus {
    ${(props) =>
      !props.isValid
        ? `border: 1px solid ${colors.$red}`
        : `border: 1px solid ${colors.$black}`};
  }

  ::placeholder {
    color: ${colors.$gray};
  }
`;
