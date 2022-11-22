import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import { calcAspectRatio } from 'utils';

const Figure = styled.figure<{
  width: number;
  height: number;
}>`
  display: flex;
  width: ${({ width, height }) =>
    calcAspectRatio(width, height).width * 0.75}px;
  height: ${({ width, height }) =>
    calcAspectRatio(width, height).height * 0.75}px;
  max-width: ${({ width }) => width}px;
  max-height: ${({ height }) => height}px;
  margin: auto;
  position: relative;
`;

const Image = styled.div<{ url: string }>`
  background-image: url('${({ url }) => url}');
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  width: 100%;
  height: 20vh;
  min-height: 60px;
  transition: 100ms linear;

  &:hover {
    transform: scale(1.15);
    filter: brightness(120%);
    z-index: 1;
  }
`;

const slide = keyframes`
  from {
    background-position: 0%;
  }
  to {
    background-position: 100%;
  }
`;

const Skeleton = styled.div<{ isVisible: boolean }>`
  background: var(--gradient-skeleton-background);
  background-size: 1400px;
  animation: ${slide} 1s linear infinite alternate;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

const Styled = {
  Figure,
  Image,
  Skeleton
};

export default Styled;
