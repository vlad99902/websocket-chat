import styled from 'styled-components';
import { colors } from './colors';

export const Container = styled.div`
  max-width: ${(p) => p.maxWidth || 860}px;
  padding: 18px;
  margin: 0 auto;
`;

export const Card = styled.div`
  background-color: ${colors.$white};
  border-radius: 16px;
  padding: 20px;

  box-shadow: 0px 8px 29px 5px rgba(130, 130, 130, 0.15);

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    box-shadow: none;
    padding: 0;
  }
`;
