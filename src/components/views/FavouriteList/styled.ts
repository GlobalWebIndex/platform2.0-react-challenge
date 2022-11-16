import styled from '@emotion/styled';

import binIcon from 'gfx/bin.svg';

const Image = styled.div<{ url: string }>`
  background-image: url('${({ url }) => url}');
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  width: 100%;
  height: 20vh;
  min-height: 60px;
  transition: 100ms linear;
`;

const Bin = styled.div`
  cursor: pointer;
  position: relative;

  &::before {
    content: '';
    background-image: url('${binIcon}');
    background-size: 100%;
    width: 16px;
    height: 16px;
    position: absolute;
    right: 8px;
    bottom: 11px;
    z-index: 1;
  }

  &::after {
    content: '';
    background: var(--color-remove-favourite-background);
    box-shadow: 0 0 16px rgba(0, 0, 0, 45%);
    position: absolute;
    bottom: -40px;
    right: -40px;
    width: 80px;
    height: 80px;
    transform: rotateZ(45deg);
  }

  &:hover::after {
    background: var(--color-remove-favourite-background-hover);
  }
`;

const Styled = {
  Image,
  Bin
};

export default Styled;
