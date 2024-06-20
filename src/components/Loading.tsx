import React from 'react';
import styled, { keyframes } from 'styled-components';
import { LoadingIcon } from './icons';

const Loading = () => {
  return (
    <LoadingContainer id="loading-renderer" data-testid="loading-renderer">
      <LoadingIconContainer>
        <LoadingIcon color="#444" size={40} />
      </LoadingIconContainer>
    </LoadingContainer>
  );
};

export { Loading };

const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  height: 75px;
  align-items: center;
  justify-content: center;
`;
const spinAnim = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const LoadingIconContainer = styled.div`
  animation-name: ${spinAnim};
  animation-duration: 4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;
