import styled from 'styled-components';
import { colors } from '../utils/colors';

/**
 * Base button component
 * @param {object} param0
 */
export const BaseButton = ({ children, variant, ...rest }) => {
  return (
    <StyledButton variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  margin-top: ${(props) => props.mt};
  margin-left: ${(props) => props.ml};
  ${(props) =>
    props.variant === 'submit'
      ? `background-color: ${colors.$green}; color: ${colors.$black}; border: 1px solid ${colors.$green};`
      : `background-color: ${colors.$pink}; color: ${colors.$white}; border: 1px solid ${colors.$pink};`}

  cursor: pointer;
  user-select: none;
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
