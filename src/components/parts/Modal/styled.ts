import styled from '@emotion/styled';

import tickIcon from 'gfx/tick.svg';

const Modal = styled.div<{ isVisible?: boolean }>`
  background: var(--color-modal-background);
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 50%;
  top: 50%;
  text-align: center;
  overflow: hidden;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translate(-50%, -50%)
    scale(${({ isVisible }) => (isVisible ? 1 : 0.9)});
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: opacity 200ms ease-in-out
      ${({ isVisible }) => (isVisible ? 200 : 100)}ms,
    transform 200ms linear ${({ isVisible }) => (isVisible ? 200 : 0)}ms,
    visibility 0ms ${({ isVisible }) => (isVisible ? 0 : 300)}ms;
  width: fit-content;
  min-width: 330px;
  z-index: 1000;
`;

const Backdrop = styled.div<{ isVisible?: boolean }>`
  background: var(--color-modal-overlay-background);
  backdrop-filter: blur(40px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: opacity 300ms ease-in-out
      ${({ isVisible }) => (isVisible ? 0 : 300)}ms,
    visibility 0ms ${({ isVisible }) => (isVisible ? 0 : 300)}ms;
  z-index: 999;
`;

const Content = styled.div`
  position: relative;
`;

const Button = styled.span`
  background: var(--color-modal-button-background);
  cursor: pointer;
  display: block;
  font: 20px / 24px 600;
  padding: 16px;
  transition: 100ms;
  user-select: none;

  &::after {
    content: url('${tickIcon}');
    width: 24px;
    display: block;
    margin: auto;
  }

  &:active {
    background: var(--color-modal-button-background-hover);
  }
`;

const Styled = {
  Modal,
  Backdrop,
  Content,
  Button
};

export default Styled;
