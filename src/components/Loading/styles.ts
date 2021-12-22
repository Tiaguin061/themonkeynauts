import styled, { keyframes } from 'styled-components';

type LoadingContainerProps = {
  size?: number;
};

export const LoadingContainer = styled.div<LoadingContainerProps>`
  width: ${({size}) => `${size}rem`};
  height: ${({size}) => `${size}rem`};
`;

const circleLoadingKeyFrame = keyframes`
  from {
    transform: rotate(0deg);
  }
  to { 
    transform: rotate(360deg);
  }
`;

export const CircleLoading = styled.svg<LoadingContainerProps>`
  width: 100%;
  height: 100%;
  
	border-radius: 50%;

	border: solid 4px var(--primary-font-color);
	border-right-color: transparent;
	border-bottom-color: transparent;

  transition: all 0.5s ease-in;
  animation: ${circleLoadingKeyFrame} 1s linear infinite;
`;