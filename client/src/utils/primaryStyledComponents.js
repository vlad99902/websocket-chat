import styled from 'styled-components';

export const Container = styled.div`
  max-width: ${(p) => p.maxWidth || 860}px;
  padding: 18px;
  margin: 0 auto;
`;
